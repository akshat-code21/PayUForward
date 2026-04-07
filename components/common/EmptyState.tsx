import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { DollarSign } from 'lucide-react-native';
import { COLORS } from '@/lib/colors';
import { useColorScheme } from 'nativewind';

type Props = {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};


export default function EmptyState({
  title = 'No transactions yet!',
  message = 'Add your first income or expense to start tracking finances.',
  actionLabel = '+ Add Transaction',
  onAction,
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-1 items-center justify-center py-16">
      <View
        className="h-24 w-24 items-center justify-center rounded-full"
        style={{
          backgroundColor: isDark
            ? 'rgba(45, 212, 191, 0.12)'
            : 'rgba(15, 118, 110, 0.1)',
        }}
      >
        <View
          className="h-[72px] w-[72px] items-center justify-center rounded-full"
          style={{
            backgroundColor: isDark
              ? 'rgba(45, 212, 191, 0.2)'
              : 'rgba(15, 118, 110, 0.14)',
          }}
        >
          <DollarSign
            size={36}
            color={isDark ? COLORS.brand.dark.primary : COLORS.brand.light.primary}
          />
        </View>
      </View>

      <Text className="text-foreground text-lg font-bold mt-6 text-center">
        {title}
      </Text>
      <Text className="text-muted-foreground text-sm text-center mt-2 px-8 leading-5">
        {message}
      </Text>

      {onAction && (
        <Pressable
          onPress={onAction}
          className="mt-6 rounded-xl px-6 py-3"
          style={{
            backgroundColor: isDark
              ? COLORS.brand.dark.primary
              : COLORS.brand.light.primary,
          }}
        >
          <Text className="text-white text-sm font-semibold">{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}
