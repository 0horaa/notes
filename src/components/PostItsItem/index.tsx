import React from "react";
import {View, Text} from "react-native";
import {RectButton, RectButtonProps} from "react-native-gesture-handler";

import {styles} from "./styles";
import {PostItProps} from "../../global/types/data";

type Props = RectButtonProps & {
    data:PostItProps;
}

export function PostItsItem({data, ...rest} : Props){
    return(
        <View style={[
            styles.container, 
            {backgroundColor:data.backgroundColor}
        ]}>
            <RectButton style={styles.buttonContainer} {...rest}>
                <Text style={styles.text}>
                    {data.text}
                </Text>
            </RectButton>
        </View>
    )
}