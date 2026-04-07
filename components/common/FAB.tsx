import React from 'react';
import { Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { COLORS } from '@/lib/colors';
import { useColorScheme } from 'nativewind';

type Props = {
  onPress: () => void;
};

export default function FAB({ onPress }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Pressable
      onPress={onPress}
      className="absolute bottom-28 right-5 z-50 h-14 w-14 items-center justify-center rounded-full"
      style={{
        backgroundColor: isDark
          ? COLORS.brand.dark.primary
          : COLORS.brand.light.primary,
        shadowColor: isDark
          ? COLORS.brand.dark.primary
          : COLORS.brand.light.primary,
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
      }}
    >
      <Plus size={28} color="#fff" strokeWidth={2.5} />
    </Pressable>
  );
}
