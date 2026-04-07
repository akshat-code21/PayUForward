import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import CategoryIcon from '@/components/common/CategoryIcon';
import { BRICOLAGE } from '@/lib/fonts';
import { formatCurrency, formatDateLabel } from '@/lib/formatters';
import { COLORS } from '@/lib/colors';
import { useColorScheme } from 'nativewind';
import type { Transaction, Category } from '@/types/finance';

type Props = {
  transaction: Transaction;
  category?: Category;
  onPress?: () => void;
};

export default function TransactionRow({ transaction, category, onPress }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isIncome = transaction.type === 'income';

  const amountColor = isIncome
    ? isDark ? COLORS.income.dark : COLORS.income.light
    : isDark ? COLORS.expense.dark : COLORS.expense.light;

  const amountPrefix = isIncome ? '+' : '-';

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:opacity-80"
    >
      <CategoryIcon
        iconName={category?.icon ?? 'dollar-sign'}
        colorName={category?.color ?? 'blue'}
        size="md"
      />

      <View className="flex-1">
        <Text className="text-foreground text-sm font-semibold" numberOfLines={1}>
          {category?.name ?? 'Unknown'}
        </Text>
        <Text className="text-muted-foreground text-xs" numberOfLines={1}>
          {formatDateLabel(transaction.date)}
          {transaction.note ? ` · ${transaction.note}` : ''}
        </Text>
      </View>

      <Text
        style={{
          color: amountColor,
          fontSize: 14,
          fontFamily: BRICOLAGE.bold,
          fontWeight: '400',
        }}
      >
        {amountPrefix} {formatCurrency(transaction.amount)}
      </Text>
    </Pressable>
  );
}
