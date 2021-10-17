import React from "react";
import {View, Text} from "react-native";
import {RectButton} from "react-native-gesture-handler";
import NotesSvg from "../../../assets/Notes.svg";

import {Background} from "../../components/Background/index";
import {IconWelcome} from "../../components/IconWelcome/index";

import {styles} from "./styles";
import {useWelcome} from "../../hooks/welcome";

export function Welcome(){
    const {changeWelcomeVisibility} = useWelcome();

    return(
        <Background>
            <View style={styles.container}>
                <View style={styles.test}> 
                <IconWelcome icon={NotesSvg}/>
                <Text style={styles.title}>Organize suas tarefas {"\n"} e aprimore {"\n"} sua produtividade</Text>
                <Text style={styles.text}>Crie notas e post-its de forma {"\n"} simples e prática</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <RectButton style={styles.button} onPress={changeWelcomeVisibility}>
                        <Text style={styles.buttonText}>Quero começar</Text>
                    </RectButton>
                </View>
            </View>
        </Background>
    );
}