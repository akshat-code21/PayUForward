import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '@/components/ui/text';
import TransactionRow from '@/components/transactions/TransactionRow';
import SegmentedControl from '@/components/common/SegmentedControl';
import MonthSwitcher from '@/components/common/MonthSwitcher';
import EmptyState from '@/components/common/EmptyState';
import { formatDateLabel } from '@/lib/formatters';
import type { Transaction, Category } from '@/types/finance';

const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'income', label: 'Income' },
  { key: 'expense', label: 'Expense' },
];

type Props = {
  transactions: Transaction[];
  categories: Category[];
  filterType: string;
  onFilterChange: (key: string) => void;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  onTransactionPress?: (transaction: Transaction) => void;
  onAddTransaction?: () => void;
};

function groupByDate(transactions: Transaction[]) {
  const groups: { label: string; data: Transaction[] }[] = [];
  const map = new Map<string, Transaction[]>();

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  for (const tx of sorted) {
    const label = formatDateLabel(tx.date);
    if (!map.has(label)) {
      map.set(label, []);
      groups.push({ label, data: map.get(label)! });
    }
    map.get(label)!.push(tx);
  }

  return groups;
}

export default function TransactionList({
  transactions,
  categories,
  filterType,
  onFilterChange,
  currentMonth,
  onMonthChange,
  onTransactionPress,
  onAddTransaction,
}: Props) {
  const getCat = (id: string) => categories.find((c) => c.id === id);

  const filtered =
    filterType === 'all'
      ? transactions
      : transactions.filter((t) => t.type === filterType);

  const groups = groupByDate(filtered);

  type ListItem =
    | { type: 'header'; label: string; id: string }
    | { type: 'item'; transaction: Transaction; id: string };

  const listData: ListItem[] = [];
  for (const group of groups) {
    listData.push({ type: 'header', label: group.label, id: `h-${group.label}` });
    for (const tx of group.data) {
      listData.push({ type: 'item', transaction: tx, id: tx.id });
    }
  }

  return (
    <View className="flex-1">
      <View className="px-4 pt-2">
        <SegmentedControl
          tabs={FILTER_TABS}
          activeKey={filterType}
          onTabChange={onFilterChange}
        />
      </View>

      <MonthSwitcher currentDate={currentMonth} onDateChange={onMonthChange} />

      {listData.length === 0 ? (
        <EmptyState onAction={onAddTransaction} />
      ) : (
        <FlatList
          data={listData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => {
            if (item.type === 'header') {
              return (
                <View className="px-4 pt-4 pb-1">
                  <Text className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                    {item.label}
                  </Text>
                </View>
              );
            }
            return (
              <TransactionRow
                transaction={item.transaction}
                category={getCat(item.transaction.categoryId)}
                onPress={() => onTransactionPress?.(item.transaction)}
              />
            );
          }}
        />
      )}
    </View>
  );
}
