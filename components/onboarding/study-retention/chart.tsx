import theme from "@/lib/theme";
import { Text, useWindowDimensions, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

const primaryData = [90, 85, 82, 80, 79, 77, 75];
const secondaryData = [75, 50, 35, 28, 22, 18, 15];
const xLabels = ["Day 1", "Day 3", "Week 1", "Week 2", "Month 1", "Month 2", "Month 3"];

function createSmoothPath(
  data: number[],
  width: number,
  height: number,
  padding: number,
): string {
  const xStep = (width - padding * 2) / (data.length - 1);
  const yScale = (height - padding * 2) / 100;

  const points = data.map((value, index) => ({
    x: padding + index * xStep,
    y: height - padding - value * yScale,
  }));

  // Create smooth curve using cubic bezier
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const tension = 0.3;

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
  padding: number,
): string {
  const linePath = createSmoothPath(data, width, height, padding);
  const xStep = (width - padding * 2) / (data.length - 1);
  const lastX = padding + (data.length - 1) * xStep;
  const bottomY = height - padding;

  return `${linePath} L ${lastX} ${bottomY} L ${padding} ${bottomY} Z`;
}

export default function Chart() {
  const { width: screenWidth } = useWindowDimensions();
  const chartWidth = Math.min(screenWidth - 80, 340);
  const chartHeight = 280;
  const chartPadding = 30;

  return (
    <View style={{ alignItems: "center", gap: 16 }}>
      {/* Legend */}

      {/* Chart with Y-axis */}
      <View style={{ flexDirection: "row" }}>
        {/* Y-axis labels */}
        <View
          style={{
            height: chartHeight,
            justifyContent: "space-between",
            paddingVertical: chartPadding - 6,
            marginRight: 8,
          }}
        >
          {["100%", "75%", "50%", "25%", "0%"].map((label) => (
            <Text
              key={label}
              style={{
                fontSize: 11,
                color: theme.mutedForeground,
                fontWeight: "500",
                textAlign: "right",
              }}
            >
              {label}
            </Text>
          ))}
        </View>

        {/* Chart */}
        <View>
          <Svg width={chartWidth} height={chartHeight}>
            <Defs>
              <LinearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={theme.primary} stopOpacity={0.4} />
                <Stop
                  offset="100%"
                  stopColor={theme.primary}
                  stopOpacity={0.05}
                />
              </LinearGradient>
              <LinearGradient
                id="secondaryGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <Stop
                  offset="0%"
                  stopColor={theme.secondary}
                  stopOpacity={0.3}
                />
                <Stop
                  offset="100%"
                  stopColor={theme.secondary}
                  stopOpacity={0.05}
                />
              </LinearGradient>
            </Defs>

            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((value) => {
              const y =
                chartHeight -
                chartPadding -
                (value / 100) * (chartHeight - chartPadding * 2);
              return (
                <Path
                  key={value}
                  d={`M ${chartPadding} ${y} L ${chartWidth - chartPadding} ${y}`}
                  stroke={theme.border}
                  strokeWidth={1}
                  strokeDasharray="4,4"
                />
              );
            })}

            {/* Primary area fill */}
            <Path
              d={createAreaPath(
                primaryData,
                chartWidth,
                chartHeight,
                chartPadding,
              )}
              fill="url(#primaryGradient)"
            />

            {/* Secondary area fill */}
            <Path
              d={createAreaPath(
                secondaryData,
                chartWidth,
                chartHeight,
                chartPadding,
              )}
              fill="url(#secondaryGradient)"
            />

            {/* Primary line */}
            <Path
              d={createSmoothPath(
                primaryData,
                chartWidth,
                chartHeight,
                chartPadding,
              )}
              stroke={theme.primary}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Secondary line */}
            <Path
              d={createSmoothPath(
                secondaryData,
                chartWidth,
                chartHeight,
                chartPadding,
              )}
              stroke={theme.secondary}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Primary data points */}
            {primaryData.map((value, index) => {
              const x =
                chartPadding +
                (index * (chartWidth - chartPadding * 2)) /
                  (primaryData.length - 1);
              const y =
                chartHeight -
                chartPadding -
                (value / 100) * (chartHeight - chartPadding * 2);
              return (
                <Circle
                  key={`primary-${index}`}
                  cx={x}
                  cy={y}
                  r={6}
                  fill={theme.background}
                  stroke={theme.primary}
                  strokeWidth={2.5}
                />
              );
            })}

            {/* Secondary data points */}
            {secondaryData.map((value, index) => {
              const x =
                chartPadding +
                (index * (chartWidth - chartPadding * 2)) /
                  (secondaryData.length - 1);
              const y =
                chartHeight -
                chartPadding -
                (value / 100) * (chartHeight - chartPadding * 2);
              return (
                <Circle
                  key={`secondary-${index}`}
                  cx={x}
                  cy={y}
                  r={6}
                  fill={theme.background}
                  stroke={theme.secondary}
                  strokeWidth={2.5}
                />
              );
            })}
          </Svg>

          {/* X-axis labels */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: chartPadding - 10,
            }}
          >
            {xLabels.map((label) => (
              <Text
                key={label}
                style={{
                  fontSize: 10,
                  color: theme.mutedForeground,
                  fontWeight: "500",
                }}
              >
                {label}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 24,
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: theme.primary,
            }}
          />
          <Text
            style={{
              fontSize: 13,
              color: theme.foreground,
              fontWeight: "500",
            }}
          >
            With Recap
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: theme.secondary,
            }}
          />
          <Text
            style={{
              fontSize: 13,
              color: theme.foreground,
              fontWeight: "500",
            }}
          >
            Without Recap
          </Text>
        </View>
      </View>
    </View>
  );
}
