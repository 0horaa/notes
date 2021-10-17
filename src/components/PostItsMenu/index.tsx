import React from "react";
import {View, Text} from "react-native";
import {BorderlessButton} from "react-native-gesture-handler";
import {Ionicons} from "@expo/vector-icons";

import {styles} from "./styles";
import {theme} from "../../global/styles/theme";

type Props = {
    text:string;
    showDeleteButton:boolean;
    onDeletePostItPress?:() => void;
    onGoBack?:() => void;
}

export function PostItsMenu({text, showDeleteButton, onDeletePostItPress, onGoBack} : Props){
    return(
        <View style={styles.container}>
            <BorderlessButton onPress={onGoBack}>
                <Ionicons
                    name="md-chevron-back"
                    size={32}
                    color={theme.colors.textPrimary}
                />
            </BorderlessButton>

            <Text style={styles.text}>{text}</Text>

            {
                showDeleteButton ?
                <BorderlessButton onPress={onDeletePostItPress}>
                    <Ionicons
                        name="md-trash"
                        size={32}
                        color={theme.colors.textPrimary}
                    />
                </BorderlessButton> 
                : <View style={{width:32}}/>
            }
        </View>
    )
}