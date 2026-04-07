import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import TransactionRow from '@/components/transactions/TransactionRow';
import { COLORS } from '@/lib/colors';
import { BRICOLAGE } from '@/lib/fonts';
import { useColorScheme } from 'nativewind';
import type { Transaction, Category } from '@/types/finance';

type Props = {
  transactions: Transaction[];
  categories: Category[];
  onSeeAll?: () => void;
  onTransactionPress?: (transaction: Transaction) => void;
  maxItems?: number;
};

export default function RecentTransactions({
  transactions,
  categories,
  onSeeAll,
  onTransactionPress,
  maxItems = 5,
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const sorted = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, maxItems);

  const getCat = (id: string) => categories.find((c) => c.id === id);

  return (
    <View className="mt-1">
      <View className="flex-row justify-between items-center px-4 mb-1">
        <Text className="text-foreground text-base font-bold">
          Recent Transactions
        </Text>
        {onSeeAll && (
          <Pressable onPress={onSeeAll} hitSlop={8}>
            <Text
              style={{
                color: isDark
                  ? COLORS.brand.dark.primary
                  : COLORS.brand.light.primary,
                fontSize: 13,
                fontFamily: BRICOLAGE.semiBold,
                fontWeight: '400',
              }}
            >
              See All
            </Text>
          </Pressable>
        )}
      </View>

      {sorted.length === 0 ? (
        <View className="py-6">
          <Text className="text-muted-foreground text-sm text-center">
            No recent transactions
          </Text>
        </View>
      ) : (
        sorted.map((tx) => (
          <TransactionRow
            key={tx.id}
            transaction={tx}
            category={getCat(tx.categoryId)}
            onPress={() => onTransactionPress?.(tx)}
          />
        ))
      )}
    </View>
  );
}
