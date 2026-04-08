import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import Svg, { G, Path } from 'react-native-svg';
import { getCategoryColor } from '@/lib/colors';
import { useColorScheme } from 'nativewind';

type Slice = {
  label: string;
  value: number;
  color: string;
  percentage: number;
};

type Props = {
  data: Slice[];
  size?: number;
};

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}

export default function SpendingChart({ data, size = 180 }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const cx = size / 2;
  const cy = size / 2;
  const outerRadius = size / 2 - 4;
  const innerRadius = outerRadius * 0.55;

  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) {
    return (
      <View className="items-center gap-3">
        <View className="items-center justify-center" style={{ width: size, height: size }}>
          <Svg width={size} height={size}>
            <Path
              d={describeArc(cx, cy, outerRadius, 0, 359.99)}
              fill={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}
            />
            <Path
              d={describeArc(cx, cy, innerRadius, 0, 359.99)}
              fill={isDark ? '#0f0f1a' : '#ffffff'}
            />
          </Svg>
        </View>
        <Text className="text-muted-foreground text-sm text-center px-6 leading-5">
          No expense transactions this month. Spending will appear here once you add some.
        </Text>
      </View>
    );
  }

  let currentAngle = 0;

  return (
    <View className="items-center gap-4">
      <View className="items-center justify-center" style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <G>
            {data.map((slice, i) => {
              const sliceAngle = (slice.value / total) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + sliceAngle;
              currentAngle = endAngle;

              const { color } = getCategoryColor(slice.color, isDark);
              if (sliceAngle < 0.5) return null;

              return (
                <Path
                  key={i}
                  d={describeArc(cx, cy, outerRadius, startAngle, endAngle - 0.5)}
                  fill={color}
                />
              );
            })}
            <Path
              d={describeArc(cx, cy, innerRadius, 0, 359.99)}
              fill={isDark ? '#0f0f1a' : '#ffffff'}
            />
          </G>
        </Svg>
      </View>

      <View className="flex-row flex-wrap justify-center gap-2 px-4">
        {data
          .filter((s) => s.percentage >= 1)
          .map((slice, i) => {
            const { color } = getCategoryColor(slice.color, isDark);
            return (
              <View key={i} className="flex-row items-center gap-1 px-2.5 py-1.5 rounded-lg">
                <View className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                <Text className="text-foreground text-xs font-medium" numberOfLines={1}>
                  {slice.label}
                </Text>
                <Text className="text-muted-foreground text-xs">
                  {slice.percentage.toFixed(0)}%
                </Text>
              </View>
            );
          })}
      </View>
    </View>
  );
}
