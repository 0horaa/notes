import React from "react";
import {
    Modal,
    ModalProps,
    TouchableWithoutFeedback,
    View,
    Text
} from "react-native";
import { theme } from "../../global/styles/theme";

import {styles} from "./styles";

type Props = ModalProps & {
    title:string;
    text:string;
    closeModal:() => void;
    negativeAnswer?:() => void;
    positiveAnswer?:() => void;
}

export function AlertModal
({title, text, closeModal, negativeAnswer, positiveAnswer, ...rest} : Props){
    return(
        <Modal
            transparent={true}
            animationType="fade"
            statusBarTranslucent={true}
            {...rest}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                    <View style={[styles.container, {backgroundColor:theme.colors.backgroundSecundary}]}>
                        <Text style={[styles.title, {color:theme.colors.textPrimary}]}>{title}</Text>
                        <Text style={[styles.text, {color:theme.colors.textSecondary}]}>{text}</Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableWithoutFeedback style={styles.buttons} onPress={negativeAnswer} >
                                <Text style={styles.textButton}>NÃO</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback style={styles.buttons} onPress={positiveAnswer}>
                                <Text style={styles.textButton}>SIM</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}