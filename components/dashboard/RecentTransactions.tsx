import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import TransactionRow from '@/components/transactions/TransactionRow';
import { COLORS } from '@/lib/colors';
import { BRICOLAGE } from '@/lib/fonts';
import { useColorScheme } from 'nativewind';
import { Plus } from 'lucide-react-native';
import type { Transaction, Category } from '@/types/finance';

type Props = {
  transactions: Transaction[];
  categories: Category[];
  onSeeAll?: () => void;
  onTransactionPress?: (transaction: Transaction) => void;
  onAddTransaction?: () => void;
  maxItems?: number;
};

export default function RecentTransactions({
  transactions,
  categories,
  onSeeAll,
  onTransactionPress,
  onAddTransaction,
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
        <View className="mx-4 mt-2 rounded-2xl border border-foreground/10 bg-muted/30 px-4 py-6">
          <Text className="text-foreground text-sm font-semibold text-center">
            Nothing here yet
          </Text>
          <Text className="text-muted-foreground text-xs text-center mt-2 leading-5 px-1">
            Add an income or expense to see it show up on your home screen.
          </Text>
          {onAddTransaction && (
            <Pressable
              onPress={onAddTransaction}
              accessibilityRole="button"
              accessibilityLabel="Add your first transaction"
              className="mt-4 flex-row items-center justify-center gap-2 self-center rounded-xl px-5 py-3 active:opacity-90"
              style={{
                backgroundColor: isDark
                  ? COLORS.brand.dark.primary
                  : COLORS.brand.light.primary,
              }}
            >
              <Plus size={18} color="#fff" strokeWidth={2.5} />
              <Text
                style={{
                  color: '#fff',
                  fontFamily: BRICOLAGE.semiBold,
                  fontWeight: '400',
                  fontSize: 14,
                }}
              >
                Add transaction
              </Text>
            </Pressable>
          )}
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
