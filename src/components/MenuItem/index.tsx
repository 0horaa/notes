import React from "react";
import {TouchableOpacity, TouchableOpacityProps, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";

import {styles} from "./styles";
import {theme} from "../../global/styles/theme";

type Props = TouchableOpacityProps & {
    name:"md-newspaper" | "md-bookmarks" | "md-settings";
    title:string;
}

export function MenuItem({name, title, ...rest} : Props){
    return(
        <TouchableOpacity style={styles.item} activeOpacity={0.7} {...rest}>
            <Ionicons
                name={name}
                size={32}
                color={theme.colors.textSecondary}
            />
            <Text style={styles.textItem}>{title}</Text>
        </TouchableOpacity>
    );
}