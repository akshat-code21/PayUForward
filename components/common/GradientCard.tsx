import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/lib/colors';
import { useColorScheme } from 'nativewind';

type Props = {
  children: React.ReactNode;
  variant?: 'balance' | 'income' | 'expense';
  className?: string;
  borderRadius?: number;
};


export default function GradientCard({
  children,
  variant = 'balance',
  className = '',
  borderRadius = 20,
}: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const gradientColors =
    variant === 'income'
      ? isDark
        ? COLORS.gradient.dark.income
        : COLORS.gradient.light.income
      : variant === 'expense'
        ? isDark
          ? COLORS.gradient.dark.expense
          : COLORS.gradient.light.expense
        : isDark
          ? COLORS.gradient.dark.balance
          : COLORS.gradient.light.balance;

  return (
    <LinearGradient
      colors={gradientColors as readonly [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className={`overflow-hidden ${className}`}
      style={{ borderRadius }}
    >
      {children}
    </LinearGradient>
  );
}
