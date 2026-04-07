import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import GradientCard from '@/components/common/GradientCard';
import { formatCurrency } from '@/lib/formatters';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

type Props = {
  balance: number;
  income: number;
  expenses: number;
};


export default function BalanceCard({ balance, income, expenses }: Props) {
  return (
    <GradientCard variant="balance" className="px-5 pt-6 pb-5">
      <View className="pb-1 p-5">
        <Text
          className="text-white/65 text-xs font-semibold uppercase tracking-wider"
          style={{ letterSpacing: 0.6 }}>
          Total Balance
        </Text>
        <Text
          className="text-white font-extrabold tracking-tight mt-3"
          style={{ fontSize: 36, lineHeight: 42 }}>
          {formatCurrency(balance)}
        </Text>
      </View>

      <View className="flex-row gap-3 mt-6 p-2">
        <View
          className="flex-1 min-w-0 rounded-2xl px-3.5 py-3.5"
          style={{ backgroundColor: 'rgba(16,185,129,0.2)' }}>
          <View className="flex-row items-center gap-2.5">
            <View
              className="h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.14)' }}>
              <ArrowUpRight size={17} color="#34d399" strokeWidth={2.5} />
            </View>
            <View className="flex-1 min-w-0">
              <Text className="text-white/55 text-[11px] font-medium mb-0.5">Income</Text>
              <Text
                className="text-emerald-300 font-bold"
                style={{ fontSize: 16, lineHeight: 22 }}
                numberOfLines={1}>
                {formatCurrency(income)}
              </Text>
            </View>
          </View>
        </View>

        <View
          className="flex-1 min-w-0 rounded-2xl px-3.5 py-3.5"
          style={{ backgroundColor: 'rgba(239,68,68,0.2)' }}>
          <View className="flex-row items-center gap-2.5">
            <View
              className="h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.14)' }}>
              <ArrowDownRight size={17} color="#f87171" strokeWidth={2.5} />
            </View>
            <View className="flex-1 min-w-0">
              <Text className="text-white/55 text-[11px] font-medium mb-0.5">Expenses</Text>
              <Text
                className="text-red-200 font-bold"
                style={{ fontSize: 16, lineHeight: 22 }}
                numberOfLines={1}>
                {formatCurrency(expenses)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </GradientCard>
  );
}
