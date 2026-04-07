import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import AddTransactionForm from '@/components/transactions/AddTransactionForm';
import { COLORS } from '@/lib/colors';
import { BRICOLAGE } from '@/lib/fonts';
import { useColorScheme } from 'nativewind';
import type { Category, Transaction } from '@/types/finance';

type Props = {
  categories: Category[];
  onSave: (tx: Transaction) => void;
  onClose: () => void;
};

/**
 * Full-screen shell for adding a transaction (header + form). Used from Home and Transactions.
 */
export default function AddTransactionFullscreen({
  categories,
  onSave,
  onClose,
}: Props) {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text className="text-foreground text-lg font-bold">Add Transaction</Text>
        <Text
          onPress={onClose}
          style={{
            color: isDark ? COLORS.brand.dark.primary : COLORS.brand.light.primary,
            fontFamily: BRICOLAGE.semiBold,
            fontWeight: '400',
            fontSize: 14,
          }}
        >
          Cancel
        </Text>
      </View>

      <AddTransactionForm
        categories={categories}
        onSave={onSave}
        onCancel={onClose}
      />
    </View>
  );
}
