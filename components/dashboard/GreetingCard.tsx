import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { getGreeting } from '@/lib/formatters';

type Props = {
    userName?: string;
};

export default function GreetingHeader({ userName = 'User' }: Props) {
    return (
        <View className="flex-row items-center justify-between px-4 py-2">
            <View>
                <Text className="text-muted-foreground text-sm">
                    {getGreeting()},
                </Text>
                <Text className="text-foreground text-xl font-bold mt-0.5">
                    {userName} 👋
                </Text>
            </View>
        </View>
    );
}