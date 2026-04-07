import React from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import CategoryIcon from '@/components/common/CategoryIcon';
import { COLORS, getCategoryColor } from '@/lib/colors';
import { useColorScheme } from 'nativewind';
import type { Category } from '@/types/finance';

type Props = {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  transactionType: 'income' | 'expense';
  error?: string;
};

export default function CategoryPicker({
  categories,
  selectedId,
  onSelect,
  transactionType,
  error,
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const filtered = categories.filter((c) => c.type === transactionType);

  return (
    <View className="px-4">
      <Text className="text-muted-foreground text-sm font-medium mb-2">
        Category
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: 2 }}
      >
        {filtered.map((cat) => {
          const isActive = cat.id === selectedId;
          const { color, bg } = getCategoryColor(cat.color, isDark);

          return (
            <Pressable
              key={cat.id}
              onPress={() => onSelect(cat.id)}
              className="flex-row items-center gap-1.5 rounded-xl px-3 py-2"
              style={{
                backgroundColor: isActive
                  ? bg
                  : isDark ? COLORS.surface.dark.tertiary : COLORS.surface.light.tertiary,
                borderWidth: 1.5,
                borderColor: isActive ? color : 'transparent',
              }}
            >
              <CategoryIcon iconName={cat.icon} colorName={cat.color} size="sm" />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: isActive
                    ? color
                    : isDark ? COLORS.text.dark.secondary : COLORS.text.light.secondary,
                }}
              >
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {error && (
        <Text className="text-destructive text-xs mt-1">{error}</Text>
      )}
    </View>
  );
}
