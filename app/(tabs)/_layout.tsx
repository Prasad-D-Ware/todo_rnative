import { useTheme } from "@/hooks/use-theme"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from 'expo-router'
import React from 'react'

const TabLayout = () => {
    const { colors } = useTheme();
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor : colors.primary,
        tabBarInactiveTintColor : colors.textMuted,
        tabBarStyle : {
            backgroundColor : colors.surface,
            borderTopWidth : 1,
            borderBlockColor : colors.border,
            paddingTop : 10,
        },
        tabBarLabelStyle : {
            fontSize  : 12
        },
        headerShown : false
    }}>
        <Tabs.Screen name="index" options={{
            title: "Todos",
            tabBarIcon : ({color, size}) => (
                <Ionicons name="flash-outline" color={color} size={size}/>
            ),
        }}/>
          <Tabs.Screen name="settings" options={{
            title: "Settings",
            tabBarIcon : ({color, size}) => (
                <Ionicons name="settings-outline"  color={color} size={size}/>
            ),
        }}/>

    </Tabs>
  )
}

export default TabLayout