import React, { useMemo, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFinance } from '@/context/FinanceContext';
import { getMonthBounds, filterTransactionsByMonth, getMonthlySummary } from '@/lib/financeSelectors';

import MonthSwitcher from '@/components/common/MonthSwitcher';
import SummaryCard from '@/components/summary/SummaryCard';
import SpendingChart from '@/components/summary/SpendingChart';
import BreakdownList from '@/components/summary/BreakdownList';
import { Text } from '@/components/ui/text';

import type { Category, Transaction } from '@/types/finance';

function buildCategoryBreakdown(
  transactions: Transaction[],
  categories: Category[]
) {
  const expenseTxns = transactions.filter((t) => t.type === 'expense');
  const totalExpenses = expenseTxns.reduce((s, t) => s + t.amount, 0);

  const map = new Map<string, number>();
  for (const tx of expenseTxns) {
    map.set(tx.categoryId, (map.get(tx.categoryId) ?? 0) + tx.amount);
  }

  const items = Array.from(map.entries())
    .map(([catId, total]) => {
      const category = categories.find((c) => c.id === catId);
      if (!category) return null;
      return {
        category,
        total,
        percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b!.total - a!.total) as {
      category: Category;
      total: number;
      percentage: number;
    }[];

  const chartData = items.map((it) => ({
    label: it.category.name,
    value: it.total,
    color: it.category.color,
    percentage: it.percentage,
  }));

  return { items, chartData };
}

export default function SummaryScreen() {
  const insets = useSafeAreaInsets();
  const { transactions, categories } = useFinance();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthBounds = useMemo(() => getMonthBounds(currentMonth), [currentMonth]);
  const monthlyTxns = useMemo(
    () => filterTransactionsByMonth(transactions, monthBounds),
    [transactions, monthBounds]
  );
  const summary = useMemo(() => getMonthlySummary(monthlyTxns), [monthlyTxns]);
  const { items: breakdownItems, chartData } = useMemo(
    () => buildCategoryBreakdown(monthlyTxns, categories),
    [monthlyTxns, categories]
  );

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="px-4 py-3">
        <Text className="text-foreground text-xl font-bold">
          Monthly Summary
        </Text>
      </View>

      <MonthSwitcher currentDate={currentMonth} onDateChange={setCurrentMonth} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="px-4 mt-2">
          <SummaryCard
            income={summary.totalIncome}
            expenses={summary.totalExpenses}
            balance={summary.remainingBalance}
          />
        </View>

        <View className="mt-6 items-center">
          <Text className="text-foreground text-base font-bold mb-4">
            Spending Breakdown
          </Text>
          <SpendingChart data={chartData} size={180} />
        </View>

        <View className="mt-6">
          <BreakdownList items={breakdownItems} />
        </View>
      </ScrollView>
    </View>
  );
}
