import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useFinance } from '@/context/FinanceContext';
import { getMonthBounds, filterTransactionsByMonth } from '@/lib/financeSelectors';

import TransactionList from '@/components/transactions/TransactionList';
import AddTransactionForm from '@/components/transactions/AddTransactionForm';
import FAB from '@/components/common/FAB';
import { Text } from '@/components/ui/text';
import { COLORS } from '@/lib/colors';
import { useColorScheme } from 'nativewind';

import type { Transaction } from '@/types/finance';

export default function TransactionsScreen() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { transactions, categories, addTransaction } = useFinance();

  const [filterType, setFilterType] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showForm, setShowForm] = useState(false);

  const monthBounds = useMemo(() => getMonthBounds(currentMonth), [currentMonth]);
  const monthlyTxns = useMemo(
    () => filterTransactionsByMonth(transactions, monthBounds),
    [transactions, monthBounds]
  );

  const handleSave = (tx: Transaction) => {
    addTransaction(tx);
    setShowForm(false);
  };

  if (showForm) {
    return (
      <View
        className="flex-1 bg-background"
        style={{ paddingTop: insets.top }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <Text className="text-foreground text-lg font-bold">
            Add Transaction
          </Text>
          <Text
            onPress={() => setShowForm(false)}
            style={{
              color: isDark ? COLORS.brand.dark.primary : COLORS.brand.light.primary,
              fontWeight: '600',
              fontSize: 14,
            }}
          >
            Cancel
          </Text>
        </View>

        <AddTransactionForm
          categories={categories}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      </View>
    );
  }

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top }}
    >
      <View className="px-4 py-3">
        <Text className="text-foreground text-xl font-bold">
          Transactions
        </Text>
      </View>

      <TransactionList
        transactions={monthlyTxns}
        categories={categories}
        filterType={filterType}
        onFilterChange={setFilterType}
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
        onAddTransaction={() => setShowForm(true)}
      />

      <FAB onPress={() => setShowForm(true)} />
    </View>
  );
}
