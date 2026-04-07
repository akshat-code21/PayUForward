import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import CategoryIcon from '@/components/common/CategoryIcon';
import { formatCurrency } from '@/lib/formatters';
import { getCategoryColor, COLORS } from '@/lib/colors';
import { useColorScheme } from 'nativewind';
import type { Category } from '@/types/finance';

type BreakdownItem = {
  category: Category;
  total: number;
  percentage: number;
};

type Props = {
  items: BreakdownItem[];
};

export default function BreakdownList({ items }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (items.length === 0) {
    return (
      <View className="py-6 px-4">
        <Text className="text-muted-foreground text-sm text-center">
          No spending data for this month
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4">
      <Text className="text-foreground text-base font-bold mb-3">
        Spending Breakdown
      </Text>
      {items.map((item) => {
        const { color } = getCategoryColor(item.category.color, isDark);
        return (
          <View key={item.category.id} className="flex-row items-center gap-2.5 mb-3.5">
            <CategoryIcon
              iconName={item.category.icon}
              colorName={item.category.color}
              size="sm"
            />
            <View className="flex-1 gap-1">
              <View className="flex-row justify-between items-center">
                <Text className="text-foreground text-sm font-medium" numberOfLines={1}>
                  {item.category.name}
                </Text>
                <Text className="text-muted-foreground text-xs">
                  {formatCurrency(item.total)}
                </Text>
              </View>
              <View
                className="h-1.5 rounded-full overflow-hidden"
                style={{
                  backgroundColor: isDark
                    ? COLORS.surface.dark.tertiary
                    : COLORS.surface.light.tertiary,
                }}
              >
                <View
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: color,
                    width: `${Math.min(item.percentage, 100)}%`,
                  }}
                />
              </View>
            </View>
            <Text className="text-muted-foreground text-xs font-semibold w-10 text-right">
              {item.percentage.toFixed(0)}%
            </Text>
          </View>
        );
      })}
    </View>
  );
}
