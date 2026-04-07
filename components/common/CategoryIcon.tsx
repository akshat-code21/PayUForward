import React from 'react';
import { View } from 'react-native';
import { getCategoryIcon } from '@/lib/iconMap';
import { getCategoryColor } from '@/lib/colors';
import { useColorScheme } from 'nativewind';

type Props = {
  iconName: string;
  colorName: string;
  size?: 'sm' | 'md' | 'lg';
};

const SIZES = {
  sm: { container: 'h-8 w-8', icon: 16 },
  md: { container: 'h-10 w-10', icon: 20 },
  lg: { container: 'h-12 w-12', icon: 24 },
};

export default function CategoryIcon({ iconName, colorName, size = 'md' }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { color, bg } = getCategoryColor(colorName, isDark);
  const IconComponent = getCategoryIcon(iconName);
  const dim = SIZES[size];

  return (
    <View
      className={`${dim.container} items-center justify-center rounded-full`}
      style={{ backgroundColor: bg }}
    >
      <IconComponent size={dim.icon} color={color} />
    </View>
  );
}
