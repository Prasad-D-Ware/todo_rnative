import { useTheme } from "@/hooks/use-theme";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from 'react';

const TabLayout = () => {
    const { colors } = useTheme();
  return (
    // <Tabs screenOptions={{
    //     tabBarActiveTintColor : colors.primary,
    //     tabBarInactiveTintColor : colors.textMuted,
    //     tabBarStyle : {
    //         backgroundColor : colors.surface,
    //         borderTopWidth : 1,
    //         borderBlockColor : colors.border,
    //         paddingTop : 10,
    //     },
    //     tabBarLabelStyle : {
    //         fontSize  : 12
    //     },
    //     headerShown : false
    // }}>
    //     <Tabs.Screen name="index" options={{
    //         title: "Todos",
    //         tabBarIcon : ({color, size}) => (
    //             <Ionicons name="flash-outline" color={color} size={size}/>
    //         ),
    //     }}/>
    //       <Tabs.Screen name="settings" options={{
    //         title: "Settings",
    //         tabBarIcon : ({color, size}) => (
    //             <Ionicons name="settings-outline"  color={color} size={size}/>
    //         ),
    //     }}/>

    // </Tabs>
    <NativeTabs iconColor={{
        selected: colors.success
    }}>
        <NativeTabs.Trigger name="index">
            <Label >Todos</Label>
            <Icon sf={"checklist"} />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
            <Label >Settings</Label>
            <Icon sf={"gear"} />
        </NativeTabs.Trigger>
    </NativeTabs>
  )
}

export default TabLayout