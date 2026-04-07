import React from 'react';
import { Pressable } from 'react-native';
import { SunIcon, MoonStarIcon } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useColorScheme } from 'nativewind';

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPress={toggleColorScheme}
      size="icon"
      variant="outline"
      className="ios:size-9 rounded-full border-border bg-background/80 shadow-sm"
    >
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
