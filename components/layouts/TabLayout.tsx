import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Redirect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from '@expo-google-fonts/bricolage-grotesque';
import { useColorScheme } from 'nativewind';
import { COLORS } from '@/lib/colors';
import { BRICOLAGE, BRICOLAGE_FONT_MAP } from '@/lib/fonts';
import { useSession } from '@/hooks/useSession';

export default function TabLayout() {
  const { isLoggedIn, loading: sessionLoading } = useSession();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const tab = isDark ? COLORS.tabBar.dark : COLORS.tabBar.light;

  const [fontsLoaded] = useFonts(BRICOLAGE_FONT_MAP);
  const [tabNavRemountKey, setTabNavRemountKey] = useState(0);

  useEffect(() => {
    if (!fontsLoaded) return;
    let cancelled = false;
    let innerFrame: number | undefined;
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => {
        if (!cancelled) {
          setTabNavRemountKey((k) => k + 1);
        }
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(outerFrame);
      if (innerFrame !== undefined) cancelAnimationFrame(innerFrame);
    };
  }, [fontsLoaded]);

  if (sessionLoading) {
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
    <NativeTabs
      key={tabNavRemountKey}
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
      labelVisibilityMode={Platform.OS === 'android' ? 'labeled' : undefined}
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
