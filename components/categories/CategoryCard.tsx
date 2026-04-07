import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import CategoryIcon from '@/components/common/CategoryIcon';
import { getCategoryColor, COLORS } from '@/lib/colors';
import { formatCurrency } from '@/lib/formatters';
import { useColorScheme } from 'nativewind';
import type { Category } from '@/types/finance';

type Props = {
  category: Category;
  totalAmount: number;
  transactionCount: number;
  onPress?: () => void;
};

export default function CategoryCard({
  category,
  totalAmount,
  transactionCount,
  onPress,
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { color } = getCategoryColor(category.color, isDark);

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-center rounded-2xl p-4 min-h-[130px] active:scale-[0.97]"
      style={{
        backgroundColor: isDark
          ? COLORS.surface.dark.tertiary
          : COLORS.surface.light.secondary,
      }}
    >
      <CategoryIcon iconName={category.icon} colorName={category.color} size="lg" />
      <Text className="text-foreground text-sm font-bold mt-2" numberOfLines={1}>
        {category.name}
      </Text>
      <Text style={{ color, fontSize: 13, fontWeight: '700', marginTop: 4 }}>
        {formatCurrency(totalAmount)}
      </Text>
      <Text className="text-muted-foreground text-xs mt-0.5">
        {transactionCount} tx{transactionCount !== 1 ? 's' : ''}
      </Text>
    </Pressable>
  );
}
