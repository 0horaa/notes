import React from "react";
import {Text, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import {BorderlessButton} from "react-native-gesture-handler";

import {styles} from "./styles";
import {theme} from "../../global/styles/theme";

type Props = {
    title:string;
    openMenu:() => void;
}

export function MenuBar({title, openMenu} : Props){
    return(
        <>
            <BorderlessButton onPress={openMenu}>
                <Feather
                    name="menu"
                    size={32}
                    color={theme.colors.textPrimary}
                />
            </BorderlessButton>
            <Text style={styles.title}>{title}</Text>
        </>
    );
}