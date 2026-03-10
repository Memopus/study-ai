import theme from "@/lib/theme";
import { useEffect } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  Circle,
} from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);


// Both start at 100 on Day 1, then diverge
const recapData   = [100, 92, 88, 86, 84, 82, 80];
const normalData  = [100, 58, 38, 28, 23, 21, 20];
const xLabels     = ["Day 1", "Day 3", "Week 1", "Week 2", "Month 1", "Month 2", "Month 3"];

const DASH_LENGTH  = 900;
const DRAW_DELAY   = 300;
const DRAW_DURATION = 1500;

function pts(data: number[], w: number, h: number, pad: number) {
  const xStep = (w - pad * 2) / (data.length - 1);
  const yScale = (h - pad * 2) / 100;
  return data.map((v, i) => ({
    x: pad + i * xStep,
    y: h - pad - v * yScale,
  }));
}

function smoothPath(data: number[], w: number, h: number, pad: number): string {
  const p = pts(data, w, h, pad);
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const t = 0.35;
    const cp1x = p[i].x + (p[i + 1].x - p[i].x) * t;
    const cp2x = p[i + 1].x - (p[i + 1].x - p[i].x) * t;
    d += ` C ${cp1x} ${p[i].y}, ${cp2x} ${p[i + 1].y}, ${p[i + 1].x} ${p[i + 1].y}`;
  }
  return d;
}

function areaPath(data: number[], w: number, h: number, pad: number): string {
  const line = smoothPath(data, w, h, pad);
  const p = pts(data, w, h, pad);
  return `${line} L ${p[p.length - 1].x} ${h - pad} L ${p[0].x} ${h - pad} Z`;
}

export default function Chart() {
  const { width: screenWidth } = useWindowDimensions();
  const W = Math.min(screenWidth - 48, 360);
  const H = 240;
  const PAD = 16;

  const lineProgress = useSharedValue(0);
  const areaOpacity  = useSharedValue(0);

  useEffect(() => {
    lineProgress.value = withDelay(
      DRAW_DELAY,
      withTiming(1, { duration: DRAW_DURATION, easing: Easing.out(Easing.cubic) }),
    );
    areaOpacity.value = withDelay(
      DRAW_DELAY + DRAW_DURATION * 0.45,
      withTiming(1, { duration: 600 }),
    );
  }, []);

  const recapLineProps  = useAnimatedProps(() => ({
    strokeDashoffset: DASH_LENGTH * (1 - lineProgress.value),
  }));
  const normalLineProps = useAnimatedProps(() => ({
    strokeDashoffset: DASH_LENGTH * (1 - lineProgress.value),
  }));
  const recapAreaProps  = useAnimatedProps(() => ({
    opacity: areaOpacity.value * 0.45,
  }));
  const normalAreaProps = useAnimatedProps(() => ({
    opacity: areaOpacity.value * 0.3,
  }));
  const dotGroupProps = useAnimatedProps(() => ({
    opacity: lineProgress.value,
  }));

  const recapPts  = pts(recapData,  W, H, PAD);
  const normalPts = pts(normalData, W, H, PAD);

  return (
    <View style={{ paddingHorizontal: 20, gap: 20 }}>
      {/* Chart */}
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 11, color: theme.mutedForeground, fontWeight: "500", alignSelf: "flex-start", marginBottom: 4, marginLeft: PAD }}>
          Retention %
        </Text>
        <Svg width={W} height={H}>
          <Defs>
            <LinearGradient id="recapGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={theme.primary}    stopOpacity={1} />
              <Stop offset="100%" stopColor={theme.primary}  stopOpacity={0} />
            </LinearGradient>
            <LinearGradient id="normalGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={theme.secondary}  stopOpacity={1} />
              <Stop offset="100%" stopColor={theme.secondary} stopOpacity={0} />
            </LinearGradient>
          </Defs>

          {/* Grid */}
          {[25, 50, 75].map((v) => {
            const y = H - PAD - (v / 100) * (H - PAD * 2);
            return (
              <Path
                key={v}
                d={`M ${PAD} ${y} L ${W - PAD} ${y}`}
                stroke={theme.border}
                strokeWidth={1}
                strokeDasharray="3,4"
              />
            );
          })}

          {/* Area fills */}
          <AnimatedPath
            animatedProps={recapAreaProps}
            d={areaPath(recapData,  W, H, PAD)}
            fill="url(#recapGrad)"
          />
          <AnimatedPath
            animatedProps={normalAreaProps}
            d={areaPath(normalData, W, H, PAD)}
            fill="url(#normalGrad)"
          />

          {/* Lines (drawn) */}
          <AnimatedPath
            animatedProps={normalLineProps}
            d={smoothPath(normalData, W, H, PAD)}
            stroke={theme.secondary}
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={DASH_LENGTH}
          />
          <AnimatedPath
            animatedProps={recapLineProps}
            d={smoothPath(recapData, W, H, PAD)}
            stroke={theme.primary}
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={DASH_LENGTH}
          />

          {/* Dots */}
          <AnimatedG animatedProps={dotGroupProps}>
            {recapPts.map((p, i) => (
              <Circle
                key={`r${i}`}
                cx={p.x} cy={p.y} r={4}
                fill={theme.background}
                stroke={theme.primary}
                strokeWidth={2}
              />
            ))}
            {normalPts.map((p, i) => (
              <Circle
                key={`n${i}`}
                cx={p.x} cy={p.y} r={4}
                fill={theme.background}
                stroke={theme.secondary}
                strokeWidth={2}
              />
            ))}
          </AnimatedG>
        </Svg>

        {/* X-axis labels — only show every other one to avoid crowding */}
        <View
          style={{
            flexDirection: "row",
            width: W,
            paddingHorizontal: PAD - 8,
            marginTop: 4,
          }}
        >
          {xLabels.map((label, i) => (
            <View key={label} style={{ flex: 1, alignItems: i === 0 ? "flex-start" : i === xLabels.length - 1 ? "flex-end" : "center" }}>
              {(i === 0 || i === 3 || i === 6) && (
                <Text style={{ fontSize: 10, color: theme.mutedForeground, fontWeight: "500" }}>
                  {label}
                </Text>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Legend */}
      <View style={{ flexDirection: "row", gap: 20, justifyContent: "center" }}>
        {[
          { label: "With Recap",    color: theme.primary },
          { label: "Without Recap", color: theme.secondary },
        ].map(({ label, color }) => (
          <View key={label} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={{ width: 24, height: 3, borderRadius: 2, backgroundColor: color }} />
            <Text style={{ fontSize: 13, color: theme.foreground, fontWeight: "600" }}>
              {label}
            </Text>
          </View>
        ))}
      </View>

      {/* Stat card */}
      <View
        style={{
          backgroundColor: `${theme.primary}10`,
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: `${theme.primary}25`,
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Text style={{ fontSize: 32 }}>🧠</Text>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: theme.foreground,
              marginBottom: 3,
            }}
          >
            4x better retention
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: theme.mutedForeground,
              fontWeight: "500",
              lineHeight: 18,
            }}
          >
            Flashcards & quizzes vs. passive studying after 1 month
          </Text>
        </View>
      </View>
    </View>
  );
}
