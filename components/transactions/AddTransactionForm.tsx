import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import SegmentedControl from '@/components/common/SegmentedControl';
import AmountInput from '@/components/transactions/AmountInput';
import CategoryPicker from '@/components/transactions/CategoryPicker';
import DatePickerRow from '@/components/transactions/DatePickerRow';
import NoteInput from '@/components/transactions/NoteInput';
import { COLORS } from '@/lib/colors';
import { BRICOLAGE } from '@/lib/fonts';
import { generateId } from '@/lib/formatters';
import { useColorScheme } from 'nativewind';
import * as Haptics from 'expo-haptics';
import type { Transaction, Category } from '@/types/finance';

const TYPE_TABS = [
  { key: 'expense', label: 'Expense' },
  { key: 'income', label: 'Income' },
];

const TAB_BAR_CLEARANCE = 100;

type Props = {
  categories: Category[];
  initialTransaction?: Transaction;
  onSave: (transaction: Transaction) => void;
  onCancel: () => void;
};


export default function AddTransactionForm({
  categories,
  initialTransaction,
  onSave,
  onCancel,
}: Props) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isEdit = !!initialTransaction;

  const [txType, setTxType] = useState<string>(initialTransaction?.type ?? 'expense');
  const [amount, setAmount] = useState(initialTransaction ? String(initialTransaction.amount) : '');
  const [categoryId, setCategoryId] = useState<string | null>(
    initialTransaction?.categoryId ?? null
  );
  const [date, setDate] = useState(
    initialTransaction ? new Date(initialTransaction.date) : new Date()
  );
  const [note, setNote] = useState(initialTransaction?.note ?? '');
  const [errors, setErrors] = useState<{ amount?: string; category?: string }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!categoryId) {
      newErrors.category = 'Please select a category';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

    const transaction: Transaction = {
      id: initialTransaction?.id ?? generateId(),
      type: txType as 'income' | 'expense',
      amount: parseFloat(amount),
      categoryId: categoryId!,
      date,
      note: note.trim(),
    };

    onSave(transaction);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 16) + TAB_BAR_CLEARANCE,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-5 px-4">
          <SegmentedControl tabs={TYPE_TABS} activeKey={txType} onTabChange={setTxType} />
        </View>

        <View className="mt-5">
          <AmountInput
            value={amount}
            onChangeText={(t) => {
              setAmount(t);
              if (errors.amount) setErrors((e) => ({ ...e, amount: undefined }));
            }}
            error={errors.amount}
          />
        </View>

        <View className="mt-5">
          <CategoryPicker
            categories={categories}
            selectedId={categoryId}
            onSelect={(id) => {
              setCategoryId(id);
              if (errors.category) setErrors((e) => ({ ...e, category: undefined }));
            }}
            transactionType={txType as 'income' | 'expense'}
            error={errors.category}
          />
        </View>

        <View className="mt-5">
          <DatePickerRow date={date} onDateChange={setDate} />
        </View>

        <View className="mt-5">
          <NoteInput value={note} onChangeText={setNote} />
        </View>

        <View className="px-4 mt-8">
          <Pressable
            onPress={handleSave}
            className="items-center justify-center rounded-2xl py-4"
            style={{
              backgroundColor: isDark
                ? COLORS.brand.dark.primary
                : COLORS.brand.light.primary,
              shadowColor: isDark
                ? COLORS.brand.dark.primary
                : COLORS.brand.light.primary,
              shadowOpacity: 0.3,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 6,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: BRICOLAGE.bold,
                fontWeight: '400',
              }}
            >
              {isEdit ? 'Update Transaction' : 'Save Transaction'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
