import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { COLORS } from '@/lib/colors';
import { useColorScheme } from 'nativewind';

type Props = {
  tabs: { key: string; label: string }[];
  activeKey: string;
  onTabChange: (key: string) => void;
};

export default function SegmentedControl({ tabs, activeKey, onTabChange }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      className="flex-row rounded-xl p-1"
      style={{
        backgroundColor: isDark
          ? COLORS.surface.dark.tertiary
          : COLORS.surface.light.tertiary,
      }}
    >
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            className="flex-1 items-center justify-center rounded-lg py-2"
            style={
              active
                ? {
                  backgroundColor: isDark
                    ? COLORS.surface.dark.elevated
                    : COLORS.surface.light.primary,
                  shadowColor: '#000',
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 2,
                }
                : undefined
            }
          >
            <Text
              className={
                active
                  ? 'text-foreground text-sm font-semibold'
                  : 'text-muted-foreground text-sm'
              }
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
