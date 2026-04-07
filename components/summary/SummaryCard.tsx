import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import GradientCard from '@/components/common/GradientCard';
import { formatCurrency } from '@/lib/formatters';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

type Props = {
  income: number;
  expenses: number;
  balance: number;
};

export default function SummaryCard({ income, expenses, balance }: Props) {
  return (
    <GradientCard variant="balance" className="p-6">
      <Text className="text-white/60 text-sm font-medium text-center mt-4">
        Net Balance
      </Text>
      <Text className="text-white text-3xl font-extrabold text-center mt-2 tracking-tight">
        {formatCurrency(balance)}
      </Text>

      <View className="flex-row items-center justify-center mt-5 gap-8 p-3">
        <View className="items-center gap-1">
          <View className="flex-row items-center gap-1">
            <ArrowUpRight size={14} color="#34d399" strokeWidth={2.5} />
            <Text className="text-white/50 text-xs font-medium">In</Text>
          </View>
          <Text style={{ color: '#34d399', fontSize: 16, fontWeight: '700' }}>
            {formatCurrency(income)}
          </Text>
        </View>s

        <View className="w-px h-8" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

        <View className="items-center gap-1">
          <View className="flex-row items-center gap-1">
            <ArrowDownRight size={14} color="#fca5a5" strokeWidth={2.5} />
            <Text className="text-white/50 text-xs font-medium">Out</Text>
          </View>
          <Text style={{ color: '#fca5a5', fontSize: 16, fontWeight: '700' }}>
            {formatCurrency(expenses)}
          </Text>
        </View>
      </View>
    </GradientCard>
  );
}
