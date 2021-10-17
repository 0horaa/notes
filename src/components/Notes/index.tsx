import React from "react";
import {View, Text} from "react-native";
import {RectButton, RectButtonProps} from "react-native-gesture-handler";
import {LinearGradient} from "expo-linear-gradient";

import {styles} from "./styles";
import {theme} from "../../global/styles/theme";
import {DataProps} from "../../global/types/data";

type Props = RectButtonProps & {
    data:DataProps;
}

export function Notes({data, ...rest} : Props){
    return(        
        <View style={styles.container}>
            <LinearGradient 
                colors={[
                    theme.colors.grayGradientPrimary,
                    theme.colors.grayGradientSecondary
                ]}
                style={styles.notesContainer}
            >
                <RectButton {...rest} style={styles.buttonContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{data.title}</Text>
                        <Text style={styles.date}>{data.date}</Text>
                        <Text style={styles.text} numberOfLines={8}>{data.text}</Text>
                    </View>
                </RectButton>
            </LinearGradient>
        </View>
    );
}