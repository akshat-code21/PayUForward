import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFinance } from '@/context/FinanceContext';
import { getMonthBounds, filterTransactionsByMonth } from '@/lib/financeSelectors';

import TransactionList from '@/components/transactions/TransactionList';
import AddTransactionFullscreen from '@/components/transactions/AddTransactionFullscreen';
import FAB from '@/components/common/FAB';
import { Text } from '@/components/ui/text';
import type { Transaction } from '@/types/finance';

export default function TransactionsScreen() {
  const insets = useSafeAreaInsets();

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
      <AddTransactionFullscreen
        categories={categories}
        onSave={handleSave}
        onClose={() => setShowForm(false)}
      />
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
