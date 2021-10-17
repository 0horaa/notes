import React from "react";
import {TextInput, TextInputProps, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {BorderlessButton, BorderlessButtonProps} from "react-native-gesture-handler";

import {styles} from "./styles";
import {theme} from "../../global/styles/theme";

type Props = TextInputProps & {
    showDeleteButton:boolean;
    onDeleteNotePress:() => void;
    onGoBack:() => void;
};

export function NotesBar({onDeleteNotePress, onGoBack, showDeleteButton, ...rest} : Props){
    return(
        <View style={styles.container}>
            <BorderlessButton onPress={onGoBack}>
                <Ionicons
                    name="md-chevron-back"
                    size={32}
                    color={theme.colors.textPrimary}
                />
            </BorderlessButton>
            <TextInput
                style={styles.input}
                selectionColor={theme.colors.main}
                placeholder="Insira um título"
                placeholderTextColor={theme.colors.gray}
                maxLength={35}
                {...rest}
            />
            {
                showDeleteButton ?
                <BorderlessButton onPress={onDeleteNotePress}>
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