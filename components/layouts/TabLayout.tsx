import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { COLORS } from '@/lib/colors';
import { BRICOLAGE } from '@/lib/fonts';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const tab = isDark ? COLORS.tabBar.dark : COLORS.tabBar.light;

  return (
    <NativeTabs
      backgroundColor={tab.bg}
      iconColor={{ default: tab.inactive, selected: tab.active }}
      labelStyle={{
        default: {
          color: tab.inactive,
          fontSize: 11,
          fontFamily: BRICOLAGE.regular,
          fontWeight: '400',
        },
        selected: {
          color: tab.active,
          fontSize: 11,
          fontFamily: BRICOLAGE.semiBold,
          fontWeight: '400',
        },
      }}
      tintColor={tab.active}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="home" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="transactions">
        <NativeTabs.Trigger.Label>Transactions</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="receipt-long" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="summary">
        <NativeTabs.Trigger.Label>Summary</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="pie-chart" />}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={<NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="settings" />}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
