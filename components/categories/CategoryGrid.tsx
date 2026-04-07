import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import CategoryCard from '@/components/categories/CategoryCard';
import { Plus } from 'lucide-react-native';
import { COLORS } from '@/lib/colors';
import { useColorScheme } from 'nativewind';
import type { Category, Transaction } from '@/types/finance';

type Props = {
  categories: Category[];
  transactions: Transaction[];
  onCategoryPress?: (category: Category) => void;
  onAddCategory?: () => void;
};


export default function CategoryGrid({
  categories,
  transactions,
  onCategoryPress,
  onAddCategory,
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getCategoryStats = (catId: string) => {
    const txs = transactions.filter((t) => t.categoryId === catId);
    return {
      total: txs.reduce((sum, t) => sum + t.amount, 0),
      count: txs.length,
    };
  };

  const items: (Category | 'add')[] = [...categories];
  if (onAddCategory) items.push('add');

  const rows: (Category | 'add')[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <View className="px-4 pb-24">
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} className="flex-row gap-3 mb-3">
          {row.map((item) => {
            if (item === 'add') {
              return (
                <Pressable
                  key="add"
                  onPress={onAddCategory}
                  className="flex-1 items-center justify-center rounded-2xl p-4 min-h-[130px]"
                  style={{
                    backgroundColor: isDark
                      ? COLORS.surface.dark.tertiary
                      : COLORS.surface.light.secondary,
                    borderWidth: 1.5,
                    borderStyle: 'dashed',
                    borderColor: isDark
                      ? 'rgba(45, 212, 191, 0.35)'
                      : 'rgba(15, 118, 110, 0.3)',
                  }}
                >
                  <View
                    className="h-11 w-11 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: isDark
                        ? COLORS.brand.dark.muted
                        : COLORS.brand.light.muted,
                    }}
                  >
                    <Plus
                      size={22}
                      color={
                        isDark ? COLORS.brand.dark.primary : COLORS.brand.light.primary
                      }
                    />
                  </View>
                  <Text
                    style={{
                      color: isDark
                        ? COLORS.brand.dark.primary
                        : COLORS.brand.light.primary,
                      fontSize: 13,
                      fontWeight: '600',
                      marginTop: 8,
                    }}
                  >
                    + Custom
                  </Text>
                  <Text className="text-muted-foreground text-xs mt-0.5">
                    New category
                  </Text>
                </Pressable>
              );
            }

            const stats = getCategoryStats(item.id);
            return (
              <CategoryCard
                key={item.id}
                category={item}
                totalAmount={stats.total}
                transactionCount={stats.count}
                onPress={() => onCategoryPress?.(item)}
              />
            );
          })}
          {row.length === 1 && <View className="flex-1" />}
        </View>
      ))}
    </View>
  );
}
