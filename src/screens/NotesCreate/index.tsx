import React, {useState, useEffect, useCallback} from "react";
import {View, TextInput, Keyboard, BackHandler} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useNavigation, useRoute, useFocusEffect} from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import {COLLECTION_NOTES, COLLECTION_SAVE_SWITCH, COLLECTION_UPDATE_SWITCH} from "../../config/storage";

import {Background} from "../../components/Background/index";
import {NotesBar} from "../../components/NotesBar/index";
import {ButtonAdd} from "../../components/ButtonAdd/index";
import {AlertModal} from "../../components/AlertModal/index";

import {styles} from "./styles";
import {theme} from "../../global/styles/theme";
import {DataProps} from "../../global/types/data";

type NoteParams = {
    noteSelected:DataProps;
}

export function NotesCreate(){
    const navigation = useNavigation();
    const [showButtonSave, setShowButtonSave] = useState(true);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showTrashModal, setShowTrashModal] = useState(false);
    const [askForSaves, setAskForSaves] = useState(true);
    const [askForUpdates, setAskForUpdates] = useState(true);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    const completeDate = `${day}/${month}/${year}`;

    const route = useRoute();
    const {noteSelected} = route.params ? route.params as NoteParams : {} as NoteParams;

    const [titlePlaceholder, setTitlePlaceholder] = useState("");
    const [textPlaceholder, setTextPlaceholder] = useState("");

    function handleGoBack(){
        navigation.goBack();
    }

    function handleOpenSaveModal(){
        setShowSaveModal(true);
    }
    function handleCloseSaveModal(){
        setShowSaveModal(false);
    }

    function handleOpenUpdateModal(){
        setShowUpdateModal(true);
    }
    function handleCloseUpdateModal(){
        setShowUpdateModal(false);
    }

    function handleOpenTrashModal(){
        setShowTrashModal(true);
    }
    function handleCloseTrashModal(){
        setShowTrashModal(false);
    }

    useEffect(() => {
        const keyboardShowEvent = Keyboard.addListener(
            "keyboardDidShow", //quando o teclado estiver a mostra, execute a função abaixo
            () => {
                setShowButtonSave(false);
            }
        );
        const keyboardHideEvent = Keyboard.addListener(
            "keyboardDidHide", //quando o teclado não estiver a mostra, execute a função abaixo
            () => {
                setShowButtonSave(true);
            }
        );

        return () => {
            keyboardShowEvent.remove();
            keyboardHideEvent.remove();
        };

    }, []);

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
            if(noteSelected){
                if((title !== titlePlaceholder || text !== textPlaceholder) && askForUpdates){
                    handleOpenUpdateModal();
                    return true;
                }else{
                    return false;
                }
            }else{
                if(askForSaves){
                    handleOpenSaveModal();
                    return true;
                }else{
                    return false;
                }
            }
        }
        BackHandler.addEventListener("hardwareBackPress", onBackPress);
        return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [title, text, askForSaves, askForUpdates]))

    function setDataRoutesToStates(){
        if(noteSelected){
            setTitlePlaceholder(noteSelected.title);
            setTextPlaceholder(noteSelected.text);
            setTitle(noteSelected.title);
            setText(noteSelected.text);
        }
    }
    useEffect(() => {
        setDataRoutesToStates();
    }, []);

    async function handleSaveNotes(){
        const titleWithoutWhiteSpaces = title.trim();
        const textWithoutWhiteSpaces = text.trim();

        const newNote = {
            id:uuid.v4(),
            date:completeDate,
            title:titleWithoutWhiteSpaces,
            text:textWithoutWhiteSpaces
        }

        const storage = await AsyncStorage.getItem(COLLECTION_NOTES);
        const notes : DataProps[] = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_NOTES,
            JSON.stringify([...notes, newNote])
        );

        navigation.navigate("Home");
    }
    
    async function handleRemoveNotes(noteId : string | number[]){
        const storage = await AsyncStorage.getItem(COLLECTION_NOTES);
        const notes : DataProps[] = storage ? JSON.parse(storage) : []; //recebe os dados com o tipo DataProps como um array

        const updatedNotes = notes.filter((item) => item.id !== noteId) //filtra as notas e retorna todas em que o id for diferente do id que foi passado na rota
        
        await AsyncStorage.setItem(
            COLLECTION_NOTES,
            JSON.stringify(updatedNotes)
        ); 
        //por fim armazena somente os itens que foram filtrados

        navigation.navigate("Home");
    }

    async function handleUpdateNotes(noteId : string | number){
        const titleWithoutWhiteSpaces = title.trim();
        const textWithoutWhiteSpaces = text.trim();

        const newNoteUpdated = {
            id:uuid.v4(),
            date:completeDate,
            title:titleWithoutWhiteSpaces,
            text:textWithoutWhiteSpaces
        }

        const storage = await AsyncStorage.getItem(COLLECTION_NOTES);
        const notes : DataProps[] = storage ? JSON.parse(storage) : [];

        const updatedNotes = notes.filter((item) => item.id !== noteId);
        /*const updatedNotes = notes.filter(function(item){
            return item.id !== noteId;
        })*/

        await AsyncStorage.setItem(
            COLLECTION_NOTES,
            JSON.stringify([...updatedNotes, newNoteUpdated])
        );

        navigation.navigate("Home");
    }

    return(
        <Background>
            <View style={styles.header}>
                <NotesBar 
                    onChangeText={setTitle} 
                    onGoBack={() => {
                        loadSaveSettings();
                        loadUpdateSettings();

                        if(noteSelected){
                            if((title !== titlePlaceholder || text !== textPlaceholder) && askForUpdates){
                                handleOpenUpdateModal();
                            }else{
                                handleGoBack();
                            }
                        }else{
                            if(askForSaves){
                                handleOpenSaveModal();
                            }else{
                                handleGoBack();
                            }
                        }
                    }}
                    onDeleteNotePress={handleOpenTrashModal}
                    showDeleteButton={noteSelected ? true : false}
                    value={noteSelected && title}
                />
            </View>
            <TextInput
                style={styles.inputNotes}
                selectionColor={theme.colors.main}
                multiline={true}
                maxLength={5000}
                placeholder="Clique aqui para começar a escrever"
                placeholderTextColor={theme.colors.gray}
                onChangeText={setText}
                value={noteSelected && text}
            />
            {
                showButtonSave &&
                <View style={styles.buttonPosition}>
                    <ButtonAdd 
                        onPress={
                            noteSelected ? () => handleUpdateNotes(noteSelected.id) : handleSaveNotes
                        } 
                        icon={
                            <MaterialCommunityIcons
                                name="check"
                                size={32}
                                color={theme.colors.textPrimary}
                            />
                        }
                    />
                </View>
            }

            <AlertModal 
                visible={showSaveModal} 
                title="Atenção"
                text="Deseja salvar essa nota como rascunho?" 
                closeModal={handleCloseSaveModal}
                negativeAnswer={() => {
                    handleCloseSaveModal();
                    setTimeout(() => {handleGoBack()}, 100);
                }}
                positiveAnswer={() => {
                    handleCloseSaveModal();
                    setTimeout(() => {handleSaveNotes()}, 100);
                }}
            />

            <AlertModal
                visible={showUpdateModal}
                title="Atenção"
                text="Deseja salvar as alterações feitas?"
                closeModal={handleCloseUpdateModal}
                negativeAnswer={() => {
                    handleCloseUpdateModal();
                    setTimeout(() => {handleGoBack()}, 100);
                }}
                positiveAnswer={() => {
                    handleCloseUpdateModal();
                    setTimeout(() => {handleUpdateNotes(noteSelected.id)}, 100);
                }}
            />

            <AlertModal
                visible={showTrashModal}
                title="Atenção"
                text="Deseja excluir essa nota para sempre?"
                closeModal={handleCloseTrashModal}
                negativeAnswer={handleCloseTrashModal}
                positiveAnswer={() => {
                    handleCloseTrashModal();
                    setTimeout(() => {handleRemoveNotes(noteSelected.id)}, 100);
                }}
            />
        </Background>
    );
}