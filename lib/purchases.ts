import { err, ok, Result } from "neverthrow";
import { Platform } from "react-native";
import Purchases, {
  CustomerInfo,
  PurchasesOfferings,
  PurchasesPackage,
} from "react-native-purchases";

// RevenueCat API keys
export const API_KEYS = {
  ios: process.env.EXPO_PUBLIC_REVENUE_CAT_IOS as string,
  android: "YOUR_ANDROID_API_KEY",
};

// export const PRICING_LIFETIME = {
//   id: "birthley_lifetime",
//   title: "Lifetime",
//   price: "$19.99",
//   packageId: "lifetime",
//   badge: {
//     text: "Best Offer",
//     color: "bg-primary",
//   },
//   offeringId: "birthley",
// } as const;

// export const PRICING_FREE_LIFETIME = {
//   id: "birthley_lifetime_free",
//   title: "FREE Lifetime",
//   price: "$0.00",
//   packageId: "lifetime",
//   badge: {
//     text: "Best Offer",
//     color: "bg-primary",
//   },
//   offeringId: "freebirthley",
// } as const;

// export const PRICING_LIFETIME_DISCOUNT = {
//   id: "birthley_lifetime_onetimeoffer",
//   title: "Lifetime Discount",
//   price: "$14.99",
//   packageId: "lifetime",
//   badge: {
//     text: "Best Offer",
//     color: "bg-primary",
//   },
//   offeringId: "birthley_discount",
//   oldPrice: "19.99$",
// } as const;

// export const PRICING_YEARLY = {
//   id: "birthley_y2499_3d0",
//   title: "Yearly",
//   price: "$14.99",
//   packageId: "annual",
//   badge: {
//     text: "3 Days Free",
//     color: "bg-green-500",
//   },
//   offeringId: "birthley",
// } as const;

// export const PRICING_MONTHLY = {
//   id: "birthley_m999_3d0",
//   title: "Monthly",
//   price: "$9.99",
//   packageId: "monthly",
//   badge: {
//     text: "3 Days Free Trial",
//     color: "bg-green-500",
//   },
//   offeringId: "birthley",
// } as const;

// export const DEFAULT_OFFERING_IDS = [
//   "birthley_lifetime",
//   "birthley_y2499_3d0",
//   "birthley_m999_3d0",
// ];

// export const PRICING_OPTIONS = [
//   PRICING_LIFETIME_DISCOUNT,

//   PRICING_LIFETIME,
//   PRICING_YEARLY,
//   PRICING_MONTHLY,
//   PRICING_FREE_LIFETIME,
// ] as const;

// Initialize RevenueCat
export function setupPurchases() {
  if (Platform.OS === "ios" || Platform.OS === "android") {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.ERROR); // Remove in production
    Purchases.configure({
      apiKey: Platform.OS === "ios" ? API_KEYS.ios : API_KEYS.android,
    });
  }
}

// Check and update customer info
export async function getCustomerInfo(): Promise<Result<CustomerInfo, Error>> {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return ok(customerInfo);
  } catch (error) {
    console.warn("Error fetching customer info:", error);
    return err(new Error("Failed to fetch customer info"));
  }
}

// Check if user has active subscription
export function checkHasActiveSubscription(customerInfo: CustomerInfo | null) {
  if (!customerInfo) return false;

  return (
    typeof customerInfo.entitlements.active["premium"] !== "undefined" ||
    Object.keys(customerInfo.nonSubscriptionTransactions).length > 0
  );
}

// Purchase a package
export async function purchasePackage(
  packageToPurchase: PurchasesPackage,
): Promise<Result<CustomerInfo, Error>> {
  try {
    const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
    return ok(customerInfo);
  } catch (error: any) {
    if (error.userCancelled) {
      // User cancelled the purchase
      return err(new Error("User cancelled the purchase"));
    }

    return err(
      new Error(`Purchase failed: ${error.message || "Unknown error"}`),
    );
  }
}

// Get available packages
export async function getOfferings(): Promise<
  Result<PurchasesOfferings | null, Error>
> {
  try {
    const offerings = await Purchases.getOfferings();
    return ok(offerings);
  } catch (error) {
    console.warn("Error getting offerings:", error);
    return err(new Error("Failed to fetch offerings"));
  }
}

// Restore purchases
export async function restorePurchases(): Promise<Result<CustomerInfo, Error>> {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return ok(customerInfo);
  } catch (error) {
    console.warn("Error restoring purchases:", error);
    return err(new Error("Failed to restore purchases"));
  }
}
