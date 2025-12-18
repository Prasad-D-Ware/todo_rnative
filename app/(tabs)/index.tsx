import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyList from "@/components/empty-list";
import Header from "@/components/header";
import LoadingSpinner from "@/components/spinner";
import TodoInput from "@/components/todoinput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    Alert,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

type Todo = Doc<"todos">;

export default function Index() {
    const { colors } = useTheme();
    const [editId, setEditId] = useState<Id<"todos"> | null >(null);
    const [editText, setEditText] = useState("");

    const todos = useQuery(api.todos.getTodos);
    const toggleTodo = useMutation(api.todos.toggleTodo);
    const updateTodo = useMutation(api.todos.updateTodo);
    const deleteTodo = useMutation(api.todos.deleteTodo);
    const homeStyles = createHomeStyles(colors);

    const isLoading = todos === undefined;

    if (isLoading) return <LoadingSpinner />;

    const handleToggleTodo = async (id: Id<"todos">) => {
        try {
            await toggleTodo({ id });
        } catch (error) {
            console.log("Error while todo Toggle : ", error);
            Alert.alert("Error", "Failed to toggle todo");
        }
    };
    
    const handleDeleteTodo = async (id: Id<"todos">) => {
        Alert.alert("Delete Todo", "Are you sure you want to delete this todo?",[
            {text : "Cancel" , style : "cancel"},
            {text : "Delete" , style : "destructive", onPress: ()=> deleteTodo({ id })},
        ])
    };

    const handleEditTodo = async (todo : Todo) => {
        setEditText(todo.title);
        setEditId(todo._id);
    }

    const handleSaveTodo = async () => {
        if(editId){
            try {
                await updateTodo({id : editId , title : editText.trim()})
                setEditId(null);
                setEditText("");
            } catch (error) {
                console.log("Error while edit todo : ", error);
                Alert.alert("Error", "Failed to edit todo"); 
            }
        }
    }
    
    const handleCancelTodo = () => {
        setEditText("");
        setEditId(null);
    }

    const renderTodoItem = ({ item }: { item: Todo }) => {
        const isEditing = editId === item._id;
        return (
            <View style={homeStyles.todoItemWrapper}>
                <LinearGradient
                    style={homeStyles.todoItem}
                    colors={colors.gradients.surface}
                >
                    <TouchableOpacity
                        style={homeStyles.checkbox}
                        onPress={() => handleToggleTodo(item._id)}
                        activeOpacity={0.7}
                    >
                        <LinearGradient
                            colors={
                                item.isComplete
                                    ? colors.gradients.success
                                    : colors.gradients.muted
                            }
                            style={[
                                homeStyles.checkboxInner,
                                {
                                    borderColor: item.isComplete
                                        ? "transparent"
                                        : colors.border,
                                },
                            ]}
                        >
                             {item.isComplete && (
                                 <Ionicons
                                     name="checkmark"
                                     size={18}
                                     color={colors.primary}
                                 />
                             )}
                        </LinearGradient>
                    </TouchableOpacity>

                    {isEditing ? (
                       <View style={[homeStyles.editContainer]}>
                            <TextInput 
                                style={homeStyles.editInput}
                                value={editText}
                                onChangeText={setEditText}
                            />
                             <View style={homeStyles.editButtons}>
                                 <TouchableOpacity style={[homeStyles.button,{borderColor : colors.success}]} onPress={handleSaveTodo}>
                                     <Text style={{color: colors.success}} >Save</Text>
                                 </TouchableOpacity>
                                <TouchableOpacity style={homeStyles.button} onPress={handleCancelTodo}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                       </View> 
                    ) : (
                        <View style={homeStyles.todoTextContainer}>
                        <Text
                            style={[
                                homeStyles.todoText,
                                item.isComplete && {
                                    textDecorationLine: "line-through",
                                    color: colors.textMuted,
                                    opacity: 0.8,
                                },
                            ]}
                        >
                            {item.title}
                        </Text>

                        <View style={homeStyles.todoActions}>
                            <TouchableOpacity onPress={()=>handleEditTodo(item)} activeOpacity={0.8} style={homeStyles.button} >
                                <View>
                                    <Text style={{color: colors.text}}>Edit</Text>
                                </View>
                            </TouchableOpacity>
                             <TouchableOpacity onPress={()=>handleDeleteTodo(item._id)} activeOpacity={0.8} style={[homeStyles.button,{borderColor : colors.danger}]}>
                                 <View>
                                     <Text style={{color: colors.danger}}>Delete</Text>
                                 </View>
                             </TouchableOpacity>
                        </View>
                    </View>
                    )}
                </LinearGradient>
            </View>
        );
    };

    return (
        <View style={homeStyles.container}>
            <Svg style={[StyleSheet.absoluteFill]} pointerEvents="none">
                <Defs>
                    <RadialGradient id="bg" cx="50%" cy="2%" r="100%" >
                        <Stop offset="0%" stopColor={colors.gradients.background[0]} />
                        <Stop offset="55%" stopColor={colors.gradients.background[1]} />
                        <Stop offset="100%" stopColor={colors.gradients.background[2]} />
                    </RadialGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#bg)" />
            </Svg>
            <StatusBar barStyle={colors.statusBarStyle} />
            <SafeAreaView style={homeStyles.safeArea}>
                <Header />
                <TodoInput />
                <FlatList
                    data={todos}
                    renderItem={renderTodoItem}
                    keyExtractor={(item) => item._id}
                    style={homeStyles.todoList}
                    contentContainerStyle={homeStyles.todoListContent}
                    ListEmptyComponent={<EmptyList/>}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </View>
    );
}
