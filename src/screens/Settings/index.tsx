import React, {useState, useEffect} from "react";
import {View, Text, Switch} from "react-native";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {COLLECTION_SAVE_SWITCH, COLLECTION_UPDATE_SWITCH} from "../../config/storage";

import {Background} from "../../components/Background/index";
import {MenuBar} from "../../components/MenuBar/index";
import {MenuModal} from "../../components/MenuModal/index";
import {Separator} from "../../components/Separator/index";

import {styles} from "./styles";
import {theme} from "../../global/styles/theme";

type Props = {
    askForSaves:boolean;
    askForUpdates:boolean;
    handleChangeNoteSaves?:() => void;
}

export function Settings(){
    const [modalVisibility, setModalVisibility] = useState(false);
    const [isEnabledSaveSwitch, setIsEnabledSaveSwitch] = useState(true);
    const [isEnabledUpdateSwitch, setIsEnabledUpdateSwitch] = useState(true);
    const navigation = useNavigation();

    function openModal(){
        setModalVisibility(true);
    }
    function closeModal(){
        setModalVisibility(false);
    }

    function navigateToScreens(screen : string){
        closeModal();
        setTimeout(() => {
            navigation.navigate(screen);
        }, 150)
    }

    async function loadSettingsSaveStorage(){
        const storage = await AsyncStorage.getItem(COLLECTION_SAVE_SWITCH);
        if(storage){
            setIsEnabledSaveSwitch(false);
        }else{
            setIsEnabledSaveSwitch(true);
        }
    }

    async function loadSettingsUpdateStorage(){
        const storage = await AsyncStorage.getItem(COLLECTION_UPDATE_SWITCH);
        if(storage){
            setIsEnabledUpdateSwitch(false);
        }else{
            setIsEnabledUpdateSwitch(true);
        }
    }

    useEffect(() => {
        loadSettingsSaveStorage();
        loadSettingsUpdateStorage();
    }, [])

    async function handleChangeNoteSaves(){
        const storage = await AsyncStorage.getItem(COLLECTION_SAVE_SWITCH);
        if(storage){
            await AsyncStorage.removeItem(COLLECTION_SAVE_SWITCH);
            setIsEnabledSaveSwitch(true);
        }else{
            await AsyncStorage.setItem(COLLECTION_SAVE_SWITCH, "false");
            setIsEnabledSaveSwitch(false);
        }
    }

    async function handleChangeNoteUpdates(){
        const storage = await AsyncStorage.getItem(COLLECTION_UPDATE_SWITCH);
        if(storage){
            await AsyncStorage.removeItem(COLLECTION_UPDATE_SWITCH);
            setIsEnabledUpdateSwitch(true);
        }else{
            await AsyncStorage.setItem(COLLECTION_UPDATE_SWITCH, "false");
            setIsEnabledUpdateSwitch(false);
        }
    }

    return(
        <Background>
            <View style={styles.menuBar}>
                <MenuBar title="Configurações" openMenu={openModal}/>
            </View>

            <MenuModal
                visible={modalVisibility}
                closeModal={closeModal}
                goToAnotation={() => navigateToScreens("Home")}
                goToPostIts={() => navigateToScreens("PostIts")}
                goToSettings={() => navigateToScreens("Settings")}
            />

            <View style={styles.settings}>
                <View style={styles.settingsContainer}> 
                    <Text style={styles.textSettings} onPress={handleChangeNoteSaves}>Perguntar por rascunhos</Text>
                    <Switch
                        style={styles.switch}
                        value={isEnabledSaveSwitch}
                        onValueChange={handleChangeNoteSaves}
                        thumbColor={isEnabledSaveSwitch ? theme.colors.main : theme.colors.primarySwitch}
                        trackColor={{true:theme.colors.mainSwitch, false:theme.colors.secundarySwitch}}
                    />
                </View>
                <Separator/>
                <View style={styles.settingsContainer}>
                    <Text style={styles.textSettings} onPress={handleChangeNoteUpdates}>Perguntar por alterações feitas</Text>
                    <Switch
                        style={styles.switch}
                        value={isEnabledUpdateSwitch}
                        onValueChange={handleChangeNoteUpdates}
                        thumbColor={isEnabledUpdateSwitch ? theme.colors.main : theme.colors.primarySwitch}
                        trackColor={{true:theme.colors.mainSwitch, false:theme.colors.secundarySwitch}}
                    />
                </View>
            </View>
        </Background>
    )
}