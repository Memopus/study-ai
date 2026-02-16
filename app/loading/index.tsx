import {
  LoadingStep,
  LoadingType,
  useLoadingProgress,
  useLoadingType,
} from "@/lib/store/loading-progress";
import theme from "@/lib/theme";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type StepStatus = "pending" | "active" | "complete";

interface Step {
  id: LoadingStep;
  label: string;
  icon: string;
  title: string;
}

const DOCUMENT_STEPS: Step[] = [
  {
    id: "upload",
    label: "Uploading file",
    icon: "↑",
    title: "Uploading document...",
  },
  {
    id: "extract",
    label: "Extracting content",
    icon: "📄",
    title: "Extracting content...",
  },
  {
    id: "generate",
    label: "Generating notes",
    icon: "⚡",
    title: "Generating study notes...",
  },
  {
    id: "finalize",
    label: "Finalizing",
    icon: "✨",
    title: "Almost ready...",
  },
];

const QUIZ_STEPS: Step[] = [
  {
    id: "upload",
    label: "Analyzing content",
    icon: "🔍",
    title: "Analyzing document...",
  },
  {
    id: "extract",
    label: "Identifying key concepts",
    icon: "💡",
    title: "Finding key concepts...",
  },
  {
    id: "generate",
    label: "Generating questions",
    icon: "❓",
    title: "Creating quiz questions...",
  },
  {
    id: "finalize",
    label: "Finalizing quiz",
    icon: "✨",
    title: "Almost ready...",
  },
];

const FLASHCARDS_STEPS: Step[] = [
  {
    id: "upload",
    label: "Analyzing content",
    icon: "🔍",
    title: "Analyzing document...",
  },
  {
    id: "extract",
    label: "Extracting key terms",
    icon: "📝",
    title: "Extracting important terms...",
  },
  {
    id: "generate",
    label: "Creating flashcards",
    icon: "🎴",
    title: "Generating flashcards...",
  },
  {
    id: "finalize",
    label: "Finalizing",
    icon: "✨",
    title: "Almost ready...",
  },
];

const STEPS_MAP: Record<LoadingType, Step[]> = {
  document: DOCUMENT_STEPS,
  quiz: QUIZ_STEPS,
  flashcards: FLASHCARDS_STEPS,
};

export default function Loading() {
  const { top } = useSafeAreaInsets();
  const currentStep = useLoadingProgress();
  const loadingType = useLoadingType();
  const STEPS = STEPS_MAP[loadingType];

  // Get status for each step based on currentStep
  const getStepStatus = (stepId: LoadingStep): StepStatus => {
    const stepOrder: LoadingStep[] = [
      "upload",
      "extract",
      "generate",
      "finalize",
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return "complete";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  // Get current title
  const currentStepData = STEPS.find((s) => s.id === currentStep);
  const title = currentStepData?.title || "Processing...";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingTop: top + 60,
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Spinner />

      {/* Title */}
      <Text
        style={{
          fontSize: 25,
          fontWeight: "700",
          color: theme.foreground,
          marginBottom: 6,
          textAlign: "center",
        }}
      >
        {title}
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: 15,
          color: theme.mutedForeground,
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        This will take a few moments
      </Text>

      {/* Steps Container */}
      <View
        style={{
          width: "100%",
          maxWidth: 500,
          backgroundColor: theme.card,
          borderRadius: 16,
          padding: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        {STEPS.map((step, index) => (
          <View key={step.id}>
            <StepItem step={step} status={getStepStatus(step.id)} />
            {index < STEPS.length - 1 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: theme.border,
                  marginVertical: 10,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

function Spinner() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  return (
    <Animated.View
      style={[
        {
          width: 96,
          height: 96,
          borderRadius: 48,
          borderWidth: 8,
          borderColor: "#E8E4DC",
          borderTopColor: theme.primary,
          marginBottom: 24,
        },
        animatedStyle,
      ]}
    />
  );
}

function StepItem({ step, status }: { step: Step; status: StepStatus }) {
  const getIconStyle = () => {
    switch (status) {
      case "complete":
        return {
          backgroundColor: theme.success,
          borderColor: theme.success,
        };
      case "active":
        return {
          backgroundColor: theme.primary,
          borderColor: theme.primary,
        };
      case "pending":
        return {
          backgroundColor: theme.muted,
          borderColor: theme.border,
        };
    }
  };

  const getTextColor = () => {
    switch (status) {
      case "complete":
        return theme.foreground;
      case "active":
        return theme.foreground;
      case "pending":
        return theme.mutedForeground;
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 5,
      }}
    >
      {/* Icon Circle */}
      <Animated.View
        style={[
          {
            width: 32,
            height: 32,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
          },
          getIconStyle(),
        ]}
      >
        <Text
          style={{
            fontSize: 14,
            color: "white",
            fontWeight: "700",
          }}
        >
          {step.icon}
        </Text>
      </Animated.View>

      {/* Label */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: status === "active" ? "600" : "500",
          color: getTextColor(),
          flex: 1,
        }}
      >
        {step.label}
      </Text>
    </View>
  );
}
