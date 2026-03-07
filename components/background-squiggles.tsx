import theme from "@/lib/theme";
import React, { useEffect } from "react";
import { type ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Ellipse, Path } from "react-native-svg";

const DEG_TO_RAD = Math.PI / 180;

function ShapeIcon({ type, color }: { type: string; color: string }) {
  const sw = 2.2;

  if (type === "atom") {
    return (
      <Svg width={38} height={38}>
        <Circle
          cx={19}
          cy={19}
          r={4}
          stroke={color}
          strokeWidth={sw}
          fill="none"
        />
        <Ellipse
          cx={19}
          cy={19}
          rx={17}
          ry={7}
          stroke={color}
          strokeWidth={sw}
          fill="none"
        />
        <Ellipse
          cx={19}
          cy={19}
          rx={17}
          ry={7}
          stroke={color}
          strokeWidth={sw}
          fill="none"
          transform="rotate(60 19 19)"
        />
        <Ellipse
          cx={19}
          cy={19}
          rx={17}
          ry={7}
          stroke={color}
          strokeWidth={sw}
          fill="none"
          transform="rotate(120 19 19)"
        />
      </Svg>
    );
  }

  if (type === "pi") {
    return (
      <Svg width={30} height={26}>
        <Path
          d="M 2 6 L 28 6"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M 9 6 L 9 24"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M 21 6 L 21 20 Q 21 24 25 24"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    );
  }

  if (type === "plus") {
    return (
      <Svg width={24} height={24}>
        <Path
          d="M 12 3 L 12 21 M 3 12 L 21 12"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    );
  }

  if (type === "infinity") {
    return (
      <Svg width={40} height={22}>
        <Path
          d="M 20 11 C 20 6, 14 2, 9 5 C 4 8, 4 14, 9 17 C 14 20, 20 16, 20 11 C 20 6, 26 2, 31 5 C 36 8, 36 14, 31 17 C 26 20, 20 16, 20 11"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    );
  }

  if (type === "equals") {
    return (
      <Svg width={28} height={18}>
        <Path
          d="M 2 6 L 26 6 M 2 12 L 26 12"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    );
  }

  // star
  return (
    <Svg width={28} height={28}>
      <Path
        d="M 14 2 L 16.5 10.5 L 26 11 L 19 17 L 21.5 26 L 14 21 L 6.5 26 L 9 17 L 2 11 L 11.5 10.5 Z"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

const SHAPES = [
  {
    type: "atom",
    color: theme.primary,
    opacity: 0.4,
    ampX: 12,
    ampY: 10,
    duration: 8000,
    rot: 0.3,
    initRot: 20,
  },
  {
    type: "pi",
    color: theme.purple,
    opacity: 0.4,
    ampX: 15,
    ampY: 12,
    duration: 10000,
    rot: -0.2,
    initRot: -10,
  },
  {
    type: "plus",
    color: theme.secondary,
    opacity: 0.4,
    ampX: 10,
    ampY: 15,
    duration: 7000,
    rot: 0.5,
    initRot: 0,
  },
  {
    type: "infinity",
    color: theme.success,
    opacity: 0.4,
    ampX: 18,
    ampY: 8,
    duration: 9000,
    rot: 0.15,
    initRot: 15,
  },
  {
    type: "star",
    color: theme.secondary,
    opacity: 0.4,
    ampX: 14,
    ampY: 14,
    duration: 11000,
    rot: -0.4,
    initRot: 10,
  },
  {
    type: "equals",
    color: theme.accent,
    opacity: 0.4,
    ampX: 20,
    ampY: 10,
    duration: 8500,
    rot: -0.3,
    initRot: -15,
  },
  {
    type: "pi",
    color: theme.primary,
    opacity: 0.4,
    ampX: 12,
    ampY: 16,
    duration: 10500,
    rot: 0.4,
    initRot: 20,
  },
  {
    type: "plus",
    color: theme.purple,
    opacity: 0.4,
    ampX: 16,
    ampY: 12,
    duration: 7500,
    rot: 0.6,
    initRot: 30,
  },
  {
    type: "atom",
    color: theme.success,
    opacity: 0.4,
    ampX: 10,
    ampY: 18,
    duration: 9500,
    rot: -0.35,
    initRot: -20,
  },
  {
    type: "infinity",
    color: theme.accent,
    opacity: 0.4,
    ampX: 22,
    ampY: 10,
    duration: 8000,
    rot: 0.2,
    initRot: 5,
  },
  {
    type: "star",
    color: theme.primary,
    opacity: 0.4,
    ampX: 15,
    ampY: 15,
    duration: 10000,
    rot: -0.5,
    initRot: -25,
  },
  {
    type: "equals",
    color: theme.purple,
    opacity: 0.4,
    ampX: 18,
    ampY: 12,
    duration: 7000,
    rot: 0.25,
    initRot: 12,
  },
  {
    type: "atom",
    color: theme.accent,
    opacity: 0.4,
    ampX: 13,
    ampY: 11,
    duration: 9200,
    rot: -0.3,
    initRot: -5,
  },
] as const;

const POSITIONS: { top: string; left?: string; right?: string }[] = [
  { top: "4%", left: "6%" },
  { top: "6%", right: "8%" },
  { top: "12%", left: "40%" },
  { top: "18%", left: "15%" },
  { top: "20%", right: "18%" },
  { top: "28%", left: "55%" },
  { top: "35%", left: "22%" },
  { top: "42%", left: "55%" },
  { top: "46%", left: "8%" },
  { top: "52%", left: "38%" },
  { top: "60%", right: "10%" },
  { top: "65%", left: "22%" },
  { top: "44%", right: "5%" },
];

const FloatingShape = React.memo(
  ({
    shape,
    position,
    index,
  }: {
    shape: (typeof SHAPES)[number];
    position: (typeof POSITIONS)[number];
    index: number;
  }) => {
    const animValue = useSharedValue(0);
    const opacityValue = useSharedValue(0);
    const isEven = index % 2 === 0;
    const { ampX, ampY, rot, initRot } = shape;
    const targetOpacity = shape.opacity;

    useEffect(() => {
      const timeout = setTimeout(() => {
        opacityValue.value = withTiming(targetOpacity, { duration: 800 });
        animValue.value = withRepeat(
          withTiming(360, { duration: shape.duration, easing: Easing.linear }),
          -1,
          false,
        );
      }, index * 150);
      return () => clearTimeout(timeout);
    }, []);

    const animStyle = useAnimatedStyle(() => {
      "worklet";
      const rad = animValue.value * DEG_TO_RAD;
      const sin = Math.sin(rad);
      const cos = Math.cos(rad);
      return {
        opacity: opacityValue.value,
        transform: [
          { translateX: (isEven ? sin : cos) * ampX },
          { translateY: (isEven ? cos : sin) * ampY },
          { rotate: `${initRot + animValue.value * rot}deg` },
        ] as ViewStyle["transform"],
      };
    });

    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            top: position.top,
            left: position.left,
            right: position.right,
          } as ViewStyle,
          animStyle,
        ]}
      >
        <ShapeIcon type={shape.type} color={shape.color} />
      </Animated.View>
    );
  },
);

FloatingShape.displayName = "FloatingShape";

export default function StudyShapesBackground() {
  return (
    <>
      {SHAPES.map((shape, i) => (
        <FloatingShape
          key={i}
          shape={shape}
          position={POSITIONS[i]}
          index={i}
        />
      ))}
    </>
  );
}
