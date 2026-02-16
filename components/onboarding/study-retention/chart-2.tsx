import theme from "@/lib/theme";
import { Text, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

// Traditional studying (red): slow, modest improvement
const traditionalData = [20, 25, 30, 34, 38, 41, 44, 47];
// Studying with Recap (blue): rapid, steep improvement
const appData = [20, 40, 58, 72, 82, 88, 93, 97];

function createSmoothPath(
  data: number[],
  width: number,
  height: number,
  paddingLeft: number,
  paddingRight: number,
  paddingVertical: number,
): string {
  const xStep = (width - paddingLeft - paddingRight) / (data.length - 1);
  const yScale = (height - paddingVertical * 2) / 100;

  const points = data.map((value, index) => ({
    x: paddingLeft + index * xStep,
    y: paddingVertical + (100 - value) * yScale,
  }));

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const tension = 0.4;

    const cp1x = current.x + (next.x - current.x) * tension;
    const cp1y = current.y;
    const cp2x = next.x - (next.x - current.x) * tension;
    const cp2y = next.y;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  return path;
}

function createAreaPath(
  data: number[],
  width: number,
  height: number,
  paddingLeft: number,
  paddingRight: number,
  paddingVertical: number,
): string {
  const linePath = createSmoothPath(
    data,
    width,
    height,
    paddingLeft,
    paddingRight,
    paddingVertical,
  );
  const xStep = (width - paddingLeft - paddingRight) / (data.length - 1);
  const lastX = paddingLeft + (data.length - 1) * xStep;
  const bottomY = height - paddingVertical;

  return `${linePath} L ${lastX} ${bottomY} L ${paddingLeft} ${bottomY} Z`;
}

export default function Chart2() {
  const chartWidth = 340;
  const chartHeight = 220;
  const paddingLeft = 20;
  const paddingRight = 20;
  const paddingVertical = 30;

  const xStep =
    (chartWidth - paddingLeft - paddingRight) / (appData.length - 1);
  const yScale = (chartHeight - paddingVertical * 2) / 100;

  // Calculate endpoint positions
  const traditionalEndX = paddingLeft + (traditionalData.length - 1) * xStep;
  const traditionalEndY =
    paddingVertical +
    (100 - traditionalData[traditionalData.length - 1]) * yScale;

  const appEndX = paddingLeft + (appData.length - 1) * xStep;
  const appEndY =
    paddingVertical + (100 - appData[appData.length - 1]) * yScale;

  // Start point
  const startX = paddingLeft;
  const startY = paddingVertical + (100 - traditionalData[0]) * yScale;

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={chartWidth} height={chartHeight}>
        <Defs>
          <LinearGradient id="traditionalGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#E57373" stopOpacity={0.3} />
            <Stop offset="100%" stopColor="#E57373" stopOpacity={0.05} />
          </LinearGradient>
          <LinearGradient id="recapGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={theme.primary} stopOpacity={0.3} />
            <Stop offset="100%" stopColor={theme.primary} stopOpacity={0.05} />
          </LinearGradient>
        </Defs>

        {/* Horizontal dashed lines */}
        {[25, 50].map((value) => {
          const y = paddingVertical + (100 - value) * yScale;
          return (
            <Path
              key={value}
              d={`M ${paddingLeft} ${y} L ${chartWidth - paddingRight} ${y}`}
              stroke={theme.border}
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.5}
            />
          );
        })}

        {/* Traditional studying area fill */}
        <Path
          d={createAreaPath(
            traditionalData,
            chartWidth,
            chartHeight,
            paddingLeft,
            paddingRight,
            paddingVertical,
          )}
          fill="url(#traditionalGradient)"
        />

        {/* Recap area fill */}
        <Path
          d={createAreaPath(
            appData,
            chartWidth,
            chartHeight,
            paddingLeft,
            paddingRight,
            paddingVertical,
          )}
          fill="url(#recapGradient)"
        />

        {/* Traditional studying line (red) */}
        <Path
          d={createSmoothPath(
            traditionalData,
            chartWidth,
            chartHeight,
            paddingLeft,
            paddingRight,
            paddingVertical,
          )}
          stroke="#E57373"
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Recap line (blue) */}
        <Path
          d={createSmoothPath(
            appData,
            chartWidth,
            chartHeight,
            paddingLeft,
            paddingRight,
            paddingVertical,
          )}
          stroke={theme.primary}
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Start circle (shared starting point) */}
        <Circle
          cx={startX}
          cy={startY}
          r={6}
          fill={theme.background}
          stroke={theme.primary}
          strokeWidth={2}
        />

        {/* Traditional end circle */}
        <Circle
          cx={traditionalEndX}
          cy={traditionalEndY}
          r={6}
          fill="#E57373"
          stroke="#E57373"
          strokeWidth={2}
        />

        {/* Recap end circle */}
        <Circle
          cx={appEndX}
          cy={appEndY}
          r={6}
          fill={theme.primary}
          stroke={theme.primary}
          strokeWidth={2}
        />
      </Svg>

      {/* Recap label (top - blue line) */}
      <View
        style={{
          position: "absolute",
          right: 30,
          top: 20,
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: theme.primary,
            fontWeight: "500",
          }}
        >
          Studying with Recap
        </Text>
      </View>

      {/* Traditional label (bottom - red line) */}
      <View
        style={{
          position: "absolute",
          right: 30,
          bottom: 60,
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#E57373",
            fontWeight: "500",
          }}
        >
          Traditional studying
        </Text>
      </View>

      {/* X-axis labels */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: chartWidth,
          paddingHorizontal: paddingLeft,
          marginTop: 8,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: theme.mutedForeground,
            fontWeight: "500",
          }}
        >
          Day 1
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: theme.mutedForeground,
            fontWeight: "500",
          }}
        >
          Day 30
        </Text>
      </View>
    </View>
  );
}
