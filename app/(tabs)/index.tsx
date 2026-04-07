import React, { useMemo } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSession } from '@/hooks/useSession';
import { useFinance } from '@/context/FinanceContext';
import { getMonthBounds, filterTransactionsByMonth, getMonthlySummary } from '@/lib/financeSelectors';

import GreetingHeader from '@/components/dashboard/GreetingCard';
import BalanceCard from '@/components/dashboard/BalanceCard';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import FAB from '@/components/common/FAB';
import ThemeToggle from '@/components/common/ThemeToggle';

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { isLoggedIn, loading: sessionLoading } = useSession();
  const { transactions, categories, hydrated } = useFinance();

  const monthBounds = useMemo(() => getMonthBounds(new Date()), []);
  const monthlyTxns = useMemo(
    () => filterTransactionsByMonth(transactions, monthBounds),
    [transactions, monthBounds]
  );
  const summary = useMemo(() => getMonthlySummary(monthlyTxns), [monthlyTxns]);

  if (sessionLoading || !hydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View className="flex-1 bg-background">
      <View
        className="absolute z-10 flex-row justify-end"
        style={{
          top: insets.top + 8,
          right: Math.max(insets.right, 16),
        }}
        pointerEvents="box-none"
      >
        <ThemeToggle />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: 100,
        }}
      >
        <GreetingHeader userName="User" />
        <View className="px-4 mt-3">
          <BalanceCard
            balance={summary.remainingBalance}
            income={summary.totalIncome}
            expenses={summary.totalExpenses}
          />
        </View>
        <View className="mt-6">
          <RecentTransactions
            transactions={transactions}
            categories={categories}
            onSeeAll={() => router.push('/(tabs)/transactions')}
            onTransactionPress={() => { }}
          />
        </View>
      </ScrollView>
      <FAB onPress={() => router.push('/(tabs)/transactions')} />
    </View>
  );
}
