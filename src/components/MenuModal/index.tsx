import React from "react";
import {
    Modal, 
    ModalProps, 
    TouchableWithoutFeedback,
    View
} from "react-native";

import {Background} from "../Background/index";
import {MenuItem} from "../MenuItem/index";

import {styles} from "./styles";

type Props = ModalProps & {
    closeModal:() => void;
    goToAnotation:() => void;
    goToPostIts:() => void;
    goToSettings:() => void;
};

export function MenuModal({closeModal, goToAnotation, goToPostIts, goToSettings, ...rest} : Props){
    return(
        <Modal
            transparent={true}
            animationType="fade"
            statusBarTranslucent={true}
            {...rest}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Background>
                            <View style={styles.items}>
                                <MenuItem
                                    name="md-newspaper"
                                    title="Anotações"
                                    onPress={goToAnotation}
                                />
                                <MenuItem
                                    name="md-bookmarks"
                                    title="Post-its"
                                    onPress={goToPostIts}
                                />
                                <MenuItem
                                    name="md-settings"
                                    title="Configurações"
                                    onPress={goToSettings}
                                />
                            </View>
                        </Background>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}