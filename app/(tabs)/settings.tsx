import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

const SettingsPage = () => {
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
                        <Stop offset="0%" stopColor="#ffffff" />
                        <Stop offset="55%" stopColor="#000000" />
                        <Stop offset="100%" stopColor="#000000" />
                    </RadialGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#bg)" />
            </Svg>
            <Text
                style={{
                    fontSize: 40,
                    fontStyle: "italic",
                    color: "white",
                }}
            >
                SettingsPage
            </Text>
            <Text
                style={{
                    fontSize: 20,
                    paddingTop: 10,
                    fontStyle: "italic",
                    color: "white",
                }}
            >
                Created this page to understand tabs layout{" "}
            </Text>
            {/* <TouchableOpacity onPress={toggleDarkMode}><Text>Toggle</Text></TouchableOpacity> */}
        </View>
    );
};

export default SettingsPage;
