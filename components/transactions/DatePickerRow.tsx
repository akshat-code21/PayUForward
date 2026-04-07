import React, { useState } from 'react';
import { View, Pressable, Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import { COLORS } from '@/lib/colors';
import { BRICOLAGE } from '@/lib/fonts';
import { useColorScheme } from 'nativewind';
import { format } from 'date-fns';

type Props = {
  date: Date;
  onDateChange: (date: Date) => void;
};

export default function DatePickerRow({ date, onDateChange }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View className="px-4">
      <Text className="text-muted-foreground text-sm font-medium mb-2">
        Date
      </Text>
      <Pressable
        onPress={() => setShowPicker(!showPicker)}
        className="flex-row items-center gap-2.5 rounded-2xl px-3.5 py-3.5"
        style={{
          backgroundColor: isDark ? COLORS.surface.dark.tertiary : COLORS.surface.light.tertiary,
          borderWidth: 1.5,
          borderColor: isDark ? COLORS.surface.dark.elevated : COLORS.surface.light.tertiary,
        }}
      >
        <Calendar
          size={18}
          color={isDark ? COLORS.text.dark.tertiary : COLORS.text.light.tertiary}
        />
        <Text className="text-foreground text-sm font-medium">
          {format(date, 'MMMM dd, yyyy')}
        </Text>
      </Pressable>

      {showPicker && (
        <View className="mt-2 rounded-2xl overflow-hidden">
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={handleChange}
            maximumDate={new Date()}
            themeVariant={isDark ? 'dark' : 'light'}
          />
          {Platform.OS === 'ios' && (
            <Pressable
              onPress={() => setShowPicker(false)}
              className="items-center py-2 mt-1"
            >
              <Text
                style={{
                  color: isDark
                    ? COLORS.brand.dark.primary
                    : COLORS.brand.light.primary,
                  fontSize: 14,
                  fontFamily: BRICOLAGE.semiBold,
                  fontWeight: '400',
                }}
              >
                Done
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}
