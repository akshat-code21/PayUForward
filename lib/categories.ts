import type { Category } from '@/types/finance';

export const DEFAULT_CATEGORIES = {
  income: [
    {
      id: 'inc-1',
      name: 'Salary',
      type: 'income' as const,
      icon: 'wallet',
      color: 'green',
    },
    {
      id: 'inc-2',
      name: 'Freelance',
      type: 'income' as const,
      icon: 'laptop',
      color: 'blue',
    },
    {
      id: 'inc-3',
      name: 'Investments',
      type: 'income' as const,
      icon: 'trending-up',
      color: 'teal',
    },
    {
      id: 'inc-4',
      name: 'Other Income',
      type: 'income' as const,
      icon: 'plus-circle',
      color: 'purple',
    },
  ],
  expense: [
    {
      id: 'exp-1',
      name: 'Food',
      type: 'expense' as const,
      icon: 'utensils',
      color: 'red',
    },
    {
      id: 'exp-2',
      name: 'Transport',
      type: 'expense' as const,
      icon: 'car',
      color: 'blue',
    },
    {
      id: 'exp-3',
      name: 'Housing',
      type: 'expense' as const,
      icon: 'home',
      color: 'yellow',
    },
    {
      id: 'exp-4',
      name: 'Utilities',
      type: 'expense' as const,
      icon: 'zap',
      color: 'orange',
    },
    {
      id: 'exp-5',
      name: 'Entertainment',
      type: 'expense' as const,
      icon: 'film',
      color: 'purple',
    },
    {
      id: 'exp-6',
      name: 'Health',
      type: 'expense' as const,
      icon: 'heart',
      color: 'pink',
    },
    {
      id: 'exp-7',
      name: 'Shopping',
      type: 'expense' as const,
      icon: 'shopping-bag',
      color: 'teal',
    },
  ],
} as const;

export const SEED_CATEGORIES: Category[] = [
  ...DEFAULT_CATEGORIES.income.map((c) => ({ ...c })),
  ...DEFAULT_CATEGORIES.expense.map((c) => ({ ...c })),
];
