import React from 'react';
import { View, TextInput, Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import { COLORS } from '@/lib/colors';
import { useColorScheme } from 'nativewind';

const AMOUNT_FONT = 28;
const AMOUNT_LINE = 36;

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
};

export default function AmountInput({ value, onChangeText, error }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="px-4">
      <Text className="text-muted-foreground text-sm font-medium mb-2">
        Amount
      </Text>
      <View
        className="flex-row items-center rounded-2xl px-4 py-3 min-h-[56px]"
        style={{
          backgroundColor: isDark
            ? COLORS.surface.dark.tertiary
            : COLORS.surface.light.tertiary,
          borderWidth: 1.5,
          borderColor: error
            ? isDark ? '#f87171' : '#ef4444'
            : isDark ? COLORS.surface.dark.elevated : COLORS.surface.light.tertiary,
        }}
      >
        {/* Rupee: explicit lineHeight + no Android extra font padding so it aligns with digits */}
        <Text
          style={{
            fontSize: AMOUNT_FONT,
            lineHeight: AMOUNT_LINE,
            fontWeight: '700',
            color: isDark ? COLORS.text.dark.tertiary : COLORS.text.light.tertiary,
            marginRight: 6,
            ...(Platform.OS === 'android' ? { includeFontPadding: false as const } : {}),
          }}
        >
          ₹
        </Text>
        <TextInput
          value={value}
          onChangeText={(t) => {
            const cleaned = t.replace(/[^0-9.]/g, '');
            const parts = cleaned.split('.');
            if (parts.length > 2) return;
            if (parts[1] && parts[1].length > 2) return;
            onChangeText(cleaned);
          }}
          placeholder="0.00"
          placeholderTextColor={isDark ? COLORS.text.dark.tertiary : COLORS.text.light.tertiary}
          keyboardType="decimal-pad"
          style={{
            flex: 1,
            fontSize: AMOUNT_FONT,
            lineHeight: AMOUNT_LINE,
            fontWeight: '700',
            color: isDark ? COLORS.text.dark.primary : COLORS.text.light.primary,
            padding: 0,
            margin: 0,
            ...(Platform.OS === 'android'
              ? { textAlignVertical: 'center' as const, includeFontPadding: false as const }
              : {}),
          }}
        />
      </View>
      {error && (
        <Text className="text-destructive text-xs mt-1">{error}</Text>
      )}
    </View>
  );
}
