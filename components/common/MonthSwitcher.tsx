import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { COLORS } from '@/lib/colors';
import { formatMonthYear } from '@/lib/formatters';
import { addMonths, subMonths } from 'date-fns';
import { useColorScheme } from 'nativewind';

type Props = {
  currentDate: Date;
  onDateChange: (date: Date) => void;
};


export default function MonthSwitcher({ currentDate, onDateChange }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = isDark ? COLORS.text.dark.secondary : COLORS.text.light.secondary;

  return (
    <View className="flex-row items-center justify-center gap-4 py-2">
      <Pressable
        onPress={() => onDateChange(subMonths(currentDate, 1))}
        className="p-1 rounded-lg"
        hitSlop={12}
      >
        <ChevronLeft size={22} color={iconColor} />
      </Pressable>

      <Text className="text-foreground text-base font-semibold">
        {formatMonthYear(currentDate)}
      </Text>

      <Pressable
        onPress={() => onDateChange(addMonths(currentDate, 1))}
        className="p-1 rounded-lg"
        hitSlop={12}
      >
        <ChevronRight size={22} color={iconColor} />
      </Pressable>
    </View>
  );
}
