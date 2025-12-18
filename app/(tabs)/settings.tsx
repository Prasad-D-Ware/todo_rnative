import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

const SettingsPage = () => {
    const { colors,toggleDarkMode } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Svg style={[StyleSheet.absoluteFill]} pointerEvents="none">
                <Defs>
                    <RadialGradient id="bg" cx="50%" cy="2%" r="100%">
                        <Stop offset="0%" stopColor={colors.gradients.background[0]} />
                        <Stop offset="55%" stopColor={colors.gradients.background[1]} />
                        <Stop offset="100%" stopColor={colors.gradients.background[2]} />
                    </RadialGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#bg)" />
            </Svg>
            <Text
                style={{
                    fontSize: 40,
                    fontStyle: "italic",
                    color: colors.text,
                }}
            >
                SettingsPage
            </Text>
            <Text
                style={{
                    fontSize: 20,
                    paddingTop: 10,
                    fontStyle: "italic",
                    color: colors.text,
                }}
            >
                Created this page to understand tabs layout{" "}
            </Text>
            <TouchableOpacity onPress={toggleDarkMode}><Text>Toggle</Text></TouchableOpacity>
        </View>
    );
};

export default SettingsPage;
