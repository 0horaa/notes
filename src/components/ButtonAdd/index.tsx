import React, {ReactNode} from "react";
import {View} from "react-native";
import {RectButton, RectButtonProps} from "react-native-gesture-handler";

import {styles} from "./styles";

type Props = RectButtonProps & {
    icon:ReactNode;
}

export function ButtonAdd({icon, ...rest} : Props){
    return(
        <View> 
            <RectButton style={styles.button} {...rest}>
                {icon}
            </RectButton>
        </View>
    );
}