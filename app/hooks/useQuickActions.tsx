import * as QuickActions from "expo-quick-actions";
import { useQuickActionCallback } from "expo-quick-actions/hooks";
import { useQuickActionRouting } from "expo-quick-actions/router";
import { useEffect } from "react";
import { Platform } from "react-native";

export function useQuickActions() {
  useQuickActionCallback((action) => {
    switch (action.params?.action) {
      case "feedback":
        // Open promo paywall
        console.log("Quick Actions Feedback Clicked");
        break;
      case "leave-review":
        console.log("Quick Actions Review Clicked");
        break;

      case "try-free":
        console.log("Quick Actions Try Free Clicked");
        break;
      default:
        break;
    }
  });

  useQuickActionRouting();

  useEffect(() => {
    QuickActions.setItems([
      {
        title: "Deleting? Tell us why 🙏🏻",
        subtitle: "We really want to improve for you.",
        icon: Platform.OS === "ios" ? "symbol:bubble" : undefined,
        id: "0",
        params: { action: "feedback" },
      },
      {
        title: "🚨 !TRY FOR FREE! 🚨",
        subtitle: "Unlock Unlimited Access for Free",
        icon: Platform.OS === "ios" ? "symbol:sparkles" : undefined,
        id: "0",
        params: { href: "/paywall", action: "try-free" },
      },
      {
        title: "Enjoying Recap? ❤️",
        subtitle: "We'll love a 5 star rating from you!",
        icon: Platform.OS === "ios" ? "symbol:star.fill" : undefined,
        id: "1",
        params: { action: "leave-review" },
      },
    ]);
  }, []);
}
