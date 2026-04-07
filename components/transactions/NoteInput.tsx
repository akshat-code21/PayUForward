import React from 'react';
import { View, TextInput } from 'react-native';
import { Text } from '@/components/ui/text';
import { COLORS } from '@/lib/colors';
import { useColorScheme } from 'nativewind';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function NoteInput({ value, onChangeText }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="px-4">
      <Text className="text-muted-foreground text-sm font-medium mb-2">
        Note (optional)
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Add a note..."
        placeholderTextColor={isDark ? COLORS.text.dark.tertiary : COLORS.text.light.tertiary}
        multiline
        numberOfLines={2}
        style={{
          backgroundColor: isDark ? COLORS.surface.dark.tertiary : COLORS.surface.light.tertiary,
          color: isDark ? COLORS.text.dark.primary : COLORS.text.light.primary,
          borderColor: isDark ? COLORS.surface.dark.elevated : COLORS.surface.light.tertiary,
          borderWidth: 1.5,
          borderRadius: 14,
          paddingHorizontal: 14,
          paddingVertical: 12,
          fontSize: 14,
          minHeight: 60,
          textAlignVertical: 'top',
        }}
      />
    </View>
  );
}
