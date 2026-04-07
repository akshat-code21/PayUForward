import React, { useState } from 'react';
import { View, TextInput, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import CategoryIcon from '@/components/common/CategoryIcon';
import { COLORS, getCategoryColor } from '@/lib/colors';
import { BRICOLAGE } from '@/lib/fonts';
import { AVAILABLE_ICONS } from '@/lib/iconMap';
import { generateId } from '@/lib/formatters';
import { useColorScheme } from 'nativewind';
import type { Category } from '@/types/finance';

const COLOR_OPTIONS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'teal'] as const;

type Props = {
  categoryType: 'income' | 'expense';
  onSave: (category: Category) => void;
  onCancel: () => void;
};

const TAB_BAR_CLEARANCE = 100;

export default function AddCategoryForm({ categoryType, onSave, onCancel }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('dollar-sign');
  const [selectedColor, setSelectedColor] = useState<string>('blue');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      setError('Please enter a category name');
      return;
    }

    onSave({
      id: `custom-${generateId()}`,
      name: name.trim(),
      type: categoryType,
      icon: selectedIcon,
      color: selectedColor,
      isCustom: true,
    });
  };

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, 16) + TAB_BAR_CLEARANCE,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 mt-4">
          <Text className="text-muted-foreground text-sm font-medium mb-2">
            Category Name
          </Text>
          <TextInput
            value={name}
            onChangeText={(t) => {
              setName(t);
              if (error) setError('');
            }}
            placeholder="e.g. Groceries"
            placeholderTextColor={isDark ? COLORS.text.dark.tertiary : COLORS.text.light.tertiary}
            style={{
              backgroundColor: isDark ? COLORS.surface.dark.tertiary : COLORS.surface.light.tertiary,
              color: isDark ? COLORS.text.dark.primary : COLORS.text.light.primary,
              borderColor: error
                ? isDark ? '#f87171' : '#ef4444'
                : isDark ? COLORS.surface.dark.elevated : COLORS.surface.light.tertiary,
              borderWidth: 1.5,
              borderRadius: 14,
              paddingHorizontal: 14,
              paddingVertical: 14,
              fontSize: 16,
            }}
          />
          {error ? (
            <Text className="text-destructive text-xs mt-1">{error}</Text>
          ) : null}
        </View>

        <View className="px-4 mt-4">
          <Text className="text-muted-foreground text-sm font-medium mb-2">
            Type
          </Text>
          <View
            className="self-start rounded-full px-4 py-2"
            style={{
              backgroundColor: categoryType === 'income'
                ? isDark ? COLORS.income.bg.dark : COLORS.income.bg.light
                : isDark ? COLORS.expense.bg.dark : COLORS.expense.bg.light,
            }}
          >
            <Text
              style={{
                color:
                  categoryType === 'income'
                    ? isDark
                      ? COLORS.income.dark
                      : COLORS.income.light
                    : isDark
                      ? COLORS.expense.dark
                      : COLORS.expense.light,
                fontSize: 13,
                fontFamily: BRICOLAGE.semiBold,
                fontWeight: '400',
              }}
            >
              {categoryType === 'income' ? 'Income' : 'Expense'}
            </Text>
          </View>
        </View>

        <View className="px-4 mt-5">
          <Text className="text-muted-foreground text-sm font-medium mb-2">
            Icon
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {AVAILABLE_ICONS.map((iconName) => {
              const isActive = iconName === selectedIcon;
              return (
                <Pressable
                  key={iconName}
                  onPress={() => setSelectedIcon(iconName)}
                  className="p-2 rounded-xl"
                  style={{
                    backgroundColor: isActive
                      ? isDark
                        ? COLORS.brand.dark.muted
                        : COLORS.brand.light.muted
                      : isDark ? COLORS.surface.dark.tertiary : COLORS.surface.light.tertiary,
                    borderWidth: isActive ? 1.5 : 0,
                    borderColor: isActive
                      ? isDark
                        ? COLORS.brand.dark.primary
                        : COLORS.brand.light.primary
                      : 'transparent',
                  }}
                >
                  <CategoryIcon iconName={iconName} colorName={selectedColor} size="md" />
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="px-4 mt-5">
          <Text className="text-muted-foreground text-sm font-medium mb-2">
            Color
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {COLOR_OPTIONS.map((colorName) => {
              const isActive = colorName === selectedColor;
              const { color } = getCategoryColor(colorName, isDark);
              return (
                <Pressable
                  key={colorName}
                  onPress={() => setSelectedColor(colorName)}
                  className="h-10 w-10 rounded-full items-center justify-center"
                  style={{
                    backgroundColor: color,
                    borderWidth: isActive ? 3 : 0,
                    borderColor: '#fff',
                    shadowColor: isActive ? color : 'transparent',
                    shadowOpacity: isActive ? 0.5 : 0,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                  }}
                />
              );
            })}
          </View>
        </View>

        <View className="px-4 mt-6">
          <Text className="text-muted-foreground text-sm font-medium mb-2">
            Preview
          </Text>
          <View
            className="flex-row items-center gap-3 rounded-2xl px-4 py-3"
            style={{
              backgroundColor: isDark ? COLORS.surface.dark.tertiary : COLORS.surface.light.secondary,
            }}
          >
            <CategoryIcon iconName={selectedIcon} colorName={selectedColor} size="lg" />
            <Text className="text-foreground text-base font-semibold">
              {name || 'Category Name'}
            </Text>
          </View>
        </View>

        <View className="px-4 mt-8">
          <Pressable
            onPress={handleSave}
            className="items-center justify-center rounded-2xl py-4"
            style={{
              backgroundColor: isDark
                ? COLORS.brand.dark.primary
                : COLORS.brand.light.primary,
              shadowColor: isDark
                ? COLORS.brand.dark.primary
                : COLORS.brand.light.primary,
              shadowOpacity: 0.3,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 6,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: BRICOLAGE.bold,
                fontWeight: '400',
              }}
            >
              Create Category
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
