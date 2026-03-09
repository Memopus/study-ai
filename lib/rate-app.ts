import * as StoreReview from "expo-store-review";
import { TrackError } from "./analytics";
import { updateProfile, useProfileStore } from "./store/profile";

export async function showRateApp() {
  try {
    const hasShownRateApp = useProfileStore.getState().profile?.hasShownRateApp;

    console.log(hasShownRateApp);
    if (hasShownRateApp) {
      return;
    }

    if (await StoreReview.hasAction()) {
      await StoreReview.requestReview();
      updateProfile({
        hasShownRateApp: true,
      });
    }
  } catch (error) {
    TrackError(
      error instanceof Error
        ? error
        : new Error("Unknown error - Rate App Request Failed"),
      {
        context: "Rate App Function",
      },
    );
  }
}
