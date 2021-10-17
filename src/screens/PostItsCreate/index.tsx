import React, {useState, useEffect, useCallback} from "react";
import {View, TextInput, BackHandler} from "react-native";
import {useNavigation, useRoute, useFocusEffect} from "@react-navigation/native";
import {RectButton} from "react-native-gesture-handler";
import {Ionicons} from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage"
import uuid from "react-native-uuid";
import {COLLECTION_POSTITS, COLLECTION_SAVE_SWITCH, COLLECTION_UPDATE_SWITCH} from "../../config/storage";

import {Background} from "../../components/Background/index";
import {PostItsMenu} from "../../components/PostItsMenu/index";
import {AlertModal} from "../../components/AlertModal/index";

import {styles} from "./styles";
import {theme} from "../../global/styles/theme";
import {colorsCollection} from "../../utils/colors"; 
import {PostItProps} from "../../global/types/data";

type PostItParams = {
    postItSelected:PostItProps;
}

export function PostItsCreate(){
    const navigation = useNavigation();
    const [color, setColor] = useState(0);
    const [text, setText] = useState("");
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showTrashModal, setShowTrashModal] = useState(false);
    const [askForSaves, setAskForSaves] = useState(true);
    const [askForUpdates, setAskForUpdates] = useState(true);

    const route = useRoute();
    const {postItSelected} = route.params ? route.params as PostItParams: {} as PostItParams;

    const [colorPlaceholder, setColorPlaceholder] = useState(0);
    const [textPlaceholder, setTextPlaceholder] = useState("");

    function handleGoBack(){
        navigation.goBack();
    }

    function openSaveModal(){
        setShowSaveModal(true);
    }
    function closeSaveModal(){
        setShowSaveModal(false);
    }

    function openUpdateModal(){
        setShowUpdateModal(true);
    }
    function closeUpdateModal(){
        setShowUpdateModal(false);
    }

    function openTrashModal(){
        setShowTrashModal(true);
    }
    function closeTrashModal(){
        setShowTrashModal(false);
    }

    function generateRandomicColor(){
        setColor(Math.floor(Math.random() * 5));
    }
    useEffect(() => {
        generateRandomicColor();
    }, [])

    function handleChangeColor(){
        if(color >= 4){
            setColor(0);
        }else{
            setColor(color + 1);
        }
    }

    async function loadSaveSettings(){
        const storage = await AsyncStorage.getItem(COLLECTION_SAVE_SWITCH);
        if(storage){
            setAskForSaves(false);
        }else{
            setAskForSaves(true);
        }
    }

    async function loadUpdateSettings(){
        const storage = await AsyncStorage.getItem(COLLECTION_UPDATE_SWITCH);
        if(storage){
            setAskForUpdates(false);
        }else{
            setAskForUpdates(true);
        }
    }

    useFocusEffect(useCallback(() => {
        loadSaveSettings();
        loadUpdateSettings();

        function onBackPress(){
            if(postItSelected){
                if((text !== textPlaceholder || color !== colorPlaceholder) && askForUpdates){
                    openUpdateModal();
                    return true;
                }else{
                    return false;
                }
            }else{
                if(askForSaves){
                    openSaveModal();
                    return true;
                }else{
                    return false;
                }
            }
        }
        BackHandler.addEventListener("hardwareBackPress", onBackPress);
        return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [text, color, askForSaves, askForUpdates]));

    function setDataRoutesToStates(){
        if(postItSelected){
            setTextPlaceholder(postItSelected.text);
            setColorPlaceholder(postItSelected.indexColor);
            setText(postItSelected.text);
            setColor(postItSelected.indexColor);
        }
    }
    useEffect(() => {
        setDataRoutesToStates();
    }, [])


    async function handleSavePostIt(){
        const textWithoutSpaces = text.trim();
    
        const newPostIt = {
            id:uuid.v4(),
            text:textWithoutSpaces,
            backgroundColor:colorsCollection[color],
            indexColor:color
        }

        const storage = await AsyncStorage.getItem(COLLECTION_POSTITS);
        const postIts : PostItProps[] = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_POSTITS,
            JSON.stringify([...postIts, newPostIt])
        );

        navigation.navigate("PostIts");
    }

    async function handleRemovePostIt(postItId : string | number[]){
        const storage = await AsyncStorage.getItem(COLLECTION_POSTITS);
        const postIts : PostItProps[] = storage ? JSON.parse(storage) : [];

        const updatedPostIts = postIts.filter((item) => item.id !== postItId);

        AsyncStorage.setItem(
            COLLECTION_POSTITS,
            JSON.stringify(updatedPostIts)
        );

        navigation.navigate("PostIts")
    }

    async function handleUpdatePostIt(postItId: string | number[]){
        const textWithoutSpaces = text.trim();

        const newPostIt = {
            id:uuid.v4(),
            text:textWithoutSpaces,
            backgroundColor:colorsCollection[color],
            indexColor:color
        }

        const storage = await AsyncStorage.getItem(COLLECTION_POSTITS);
        const postIts : PostItProps[] = storage ? JSON.parse(storage) : [];

        const updatedPostIts = postIts.filter(item => item.id !== postItId);

        AsyncStorage.setItem(
            COLLECTION_POSTITS,
            JSON.stringify([...updatedPostIts, newPostIt])
        );

        navigation.navigate("PostIts");
    }

    return(
        <Background>
            <View style={styles.header}>
                <PostItsMenu 
                    text="Escrever post-it"
                    showDeleteButton={postItSelected ? true : false} 
                    onGoBack={() => {
                        loadSaveSettings();
                        loadUpdateSettings();

                        if(postItSelected){
                            if((text !== textPlaceholder || color !== colorPlaceholder) && askForUpdates){
                                openUpdateModal();
                            }else{
                                handleGoBack();
                            }
                        }else{
                            if(askForSaves){
                                openSaveModal();
                            }else{
                                handleGoBack();
                            }
                        }
                    }}
                    onDeletePostItPress={openTrashModal}
                />
            </View>

            <View style={styles.writePostIts}>
                <TextInput
                    style={[
                        styles.input, 
                        {backgroundColor:colorsCollection[color]}
                    ]}
                    multiline={true}
                    numberOfLines={5}
                    selectionColor={theme.colors.main}
                    onChangeText={setText}
                    placeholder="Escreva uma nota"
                    value={postItSelected && text}
                />
                <View style={styles.optionsPostIts}>
                    <RectButton style={styles.button} onPress={handleChangeColor}>
                        <Ionicons
                            name="md-color-palette"
                            size={44}
                            color={theme.colors.textPrimary}
                        />
                    </RectButton>
                    <RectButton 
                        style={styles.button} 
                        onPress={
                            postItSelected ? () => handleUpdatePostIt(postItSelected.id) : handleSavePostIt
                        }
                    >
                        <Ionicons
                            name="md-checkmark"
                            size={44}
                            color={theme.colors.textPrimary}
                        />
                    </RectButton>
                </View>
            </View>

            <AlertModal
                visible={showSaveModal}
                title="Atenção"
                text="Deseja salvar essa nota como rascunho?"
                closeModal={closeSaveModal}
                negativeAnswer={() => {
                    closeSaveModal();
                    setTimeout(() => {handleGoBack()}, 100);
                }}
                positiveAnswer={() => {
                    closeSaveModal();
                    setTimeout(() => {handleSavePostIt()}, 100);
                }}
            />

            <AlertModal
                visible={showUpdateModal}
                title="Atenção"
                text="Deseja salvar as alterações feitas?"
                closeModal={closeUpdateModal}
                negativeAnswer={() => {
                    closeUpdateModal();
                    setTimeout(() => {handleGoBack()}, 100);
                }}
                positiveAnswer={() => {
                    closeUpdateModal();
                    setTimeout(() => {handleUpdatePostIt(postItSelected.id)}, 100);
                }}
            />

            <AlertModal
                visible={showTrashModal}
                title="Atenção"
                text="Deseja excluir essa nota para sempre?"
                closeModal={closeTrashModal}
                negativeAnswer={closeTrashModal}
                positiveAnswer={() => {
                    closeTrashModal();
                    setTimeout(() => {handleRemovePostIt(postItSelected.id)}, 100);
                }}
            />
        </Background>
    )
}