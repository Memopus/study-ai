import { Mixpanel } from "mixpanel-react-native";

const trackAutomaticEvents = false; //disable legacy mobile autotrack
const useNative = false; //disable Native Mode, use Javascript Mode
const ANALYTICS_ENABLED = false;

const mixpanel = new Mixpanel(
  process.env.EXPO_PUBLIC_MIXPANEL,
  trackAutomaticEvents,
  useNative,
);

mixpanel.init().then(async () => {
  const deviceId = await mixpanel.getDeviceId();
  mixpanel.identify(deviceId);
});

export function TrackEvent(eventName, properties = {}) {
  if (!ANALYTICS_ENABLED) {
    return;
  }

  mixpanel.track(eventName, properties);
}

export function SetProperties(properties) {
  if (!ANALYTICS_ENABLED) {
    return;
  }
  mixpanel.getPeople().set(properties);
}

export function TrackError(
  error: Error,
  properties: {
    context: string;
    [key: string]: any;
  },
) {
  if (!ANALYTICS_ENABLED) {
    // console.log("Mixpanel Set Properties:", properties);
    return;
  }

  mixpanel.track("Error " + error.message, {
    stack: error.stack?.toString(),
    message: error.message,
    ...properties,
  });
}
