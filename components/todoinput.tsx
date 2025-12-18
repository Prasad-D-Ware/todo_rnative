import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

const TodoInput = () => {
    const { colors } = useTheme();

    const homeStyles = createHomeStyles(colors);

    const [input, setInput] = useState("");
    const addTodo = useMutation(api.todos.addTodo);

    const handleAddTodo = async () => {
        if(input.trim()){
            try {
                addTodo({
                    title : input.trim()
                })
                setInput("");
            } catch (error) {
                console.log("Error",error)
                Alert.alert("Error", "Failed to add todo")
            }
        }
    };
    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput
                    placeholder="What's the next task?"
                    value={input}
                    style={homeStyles.input}
                    onChangeText={setInput}
                    multiline
                    onSubmitEditing={handleAddTodo}
                    placeholderTextColor={colors.textMuted}
                />
                <TouchableOpacity
                    onPress={handleAddTodo}
                    activeOpacity={0.8}
                    disabled={!input.trim()}
                >
                    <LinearGradient
                        colors={
                            input.trim()
                                ? colors.gradients.primary
                                : colors.gradients.muted
                        }
                        style={[homeStyles.addButton]}
                    >
                        <Ionicons name="add" size={24} color={colors.primary} />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TodoInput;
