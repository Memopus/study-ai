import { router } from "expo-router";
import Purchases, {
  CustomerInfo,
  PurchasesOfferings,
} from "react-native-purchases";
import { create } from "zustand";
import { SetProperties, TrackError } from "../analytics";
import { getCustomerInfo, getOfferings, setupPurchases } from "../purchases";
// import { updateProfile, useProfileStore } from "./profile";

function isPremium(customerInfo: CustomerInfo | null) {
  //   if (__DEV__) return true;
  if (!customerInfo) return false;
  const proEntitlement = customerInfo.entitlements?.active?.["pro"];
  return proEntitlement?.isActive === true;
}

const DEFAULT_OFFERING_ID: OfferingId = "default";

type OfferingId = "default";

export const useRevenueCatStore = create<{
  loading: boolean;
  customerInfo: CustomerInfo | null;
  offerings: PurchasesOfferings | null;
  isSubscribed: boolean;
  currentOfferingId: OfferingId;
  actions: {
    initialize: () => Promise<void>;
    // openPaywall: (timed?: boolean, offeringId?: OfferingId) => Promise<void>;
    onCustomerInfo: (info: CustomerInfo) => void;
  };
}>((set, get) => ({
  loading: true,
  customerInfo: null,
  offerings: null,
  isSubscribed: false,
  currentOfferingId: DEFAULT_OFFERING_ID,
  actions: {
    initialize: async () => {
      const initializePurchases = async () => {
        set({
          loading: true,
        });

        // const profile = useProfileStore.getState().profile;

        // const hasShownDeveloperNote = profile?.hasShownDeveloperNote;

        // const hasCompletedOnboarding = profile?.onboardingCompleted;

        // let shouldShowPaywall = hasShownDeveloperNote && hasCompletedOnboarding;

        setupPurchases();

        // Fetch offerings and customer info
        const [offeringsResult, customerInfoResult] = await Promise.all([
          getOfferings(),
          getCustomerInfo(),
        ]);

        if (offeringsResult.isErr()) {
          console.warn("Error fetching offerings:", offeringsResult.error);
          TrackError(offeringsResult.error, {
            context: "RevenueCatStore",
          });
          return;
        }

        if (customerInfoResult.isErr()) {
          console.warn(
            "Error fetching customer info:",
            customerInfoResult.error,
          );
          TrackError(customerInfoResult.error, {
            context: "RevenueCatStore",
          });
          return;
        }

        const offeringsData = offeringsResult.value;
        const customerInfoData = customerInfoResult.value;

        set({
          offerings: offeringsData,
        });

        if (customerInfoData) {
          get().actions.onCustomerInfo(customerInfoData);
        }

        const _isPremium = isPremium(customerInfoData);

        if (!_isPremium && process.env.NODE_ENV === "production") {
          // Redirect to paywall if not premium
          setTimeout(() => {
            router.push("/paywall");
          }, 100);
        }

        set({ loading: false });
      };

      initializePurchases();

      // Set up listener for customer info updates
      Purchases.addCustomerInfoUpdateListener(get().actions.onCustomerInfo);
    },
    onCustomerInfo: (info: CustomerInfo) => {
      const _isPremium = isPremium(info);

      SetProperties({
        isProUser: _isPremium,
      });

      set({
        customerInfo: info,
        isSubscribed: _isPremium,
      });
    },
    // openPaywall: async (
    //   timed = false,
    //   offeringId: OfferingId = DEFAULT_OFFERING_ID,
    // ) => {
    //   set({
    //     currentOfferingId: offeringId,
    //   });

    //   if (timed) {
    //     router.push("/paywall/time");
    //     return;
    //   }

    //   router.push("/paywall");
    // },
  },
}));

export const useIsProUser = () =>
  useRevenueCatStore((state) => state.isSubscribed);

export const useIsRevenueCatLoading = () =>
  useRevenueCatStore((state) => state.loading);

export const useRevenueCatActions = () =>
  useRevenueCatStore((state) => state.actions);

export const useOfferings = () =>
  useRevenueCatStore((state) => state.offerings);

export const useCurrentOfferingId = () =>
  useRevenueCatStore((state) => state.currentOfferingId);
