import React, {useState, useCallback, useEffect} from "react";
import {View, FlatList, Text} from "react-native";
import {useNavigation, useFocusEffect} from "@react-navigation/native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RectButton} from "react-native-gesture-handler";
import {Ionicons} from "@expo/vector-icons";

import {Background} from "../../components/Background/index";
import {MenuBar} from "../../components/MenuBar/index";
import {MenuModal} from "../../components/MenuModal/index";
import {ButtonAdd} from "../../components/ButtonAdd/index";
import {Notes} from "../../components/Notes/index";
import {Loading} from "../../components/Loading/index";

import {styles} from "./styles";
import {theme} from "../../global/styles/theme";
import {DataProps} from "../../global/types/data";
import {COLLECTION_NOTES} from "../../config/storage";

export function Home(){
    const [modalVisibility, setModalVisibility] = useState(false);
    const [loading, setLoading] = useState(true);
    const [recents, setRecents] = useState(true);
    const [notes, setNotes] = useState<DataProps[]>([]);
    const navigation = useNavigation();

    function openModal(){
        setModalVisibility(true);
    }
    function closeModal(){
        setModalVisibility(false);
    }

    function changeRecents(){
        setRecents(!recents);
    }

    function navigateToScreens(screen : string){
        closeModal();
        setTimeout(() => {
            navigation.navigate(screen);
        }, 150);
    }

    function handleNotesCreate(){
        navigation.navigate("NotesCreate");
    }

    function handleNotesUpdate(noteSelected : DataProps){
        navigation.navigate("NotesCreate", {noteSelected});
    }

    async function loadNotes(){
        const storedNotes = await AsyncStorage.getItem(COLLECTION_NOTES)
        const storage : DataProps[] = storedNotes ? JSON.parse(storedNotes) : [];

        if(recents){
            setNotes(storage.reverse()); //reverse inverte o array pra exibí-lo de forma decrescente
        }else{
            setNotes(storage);
        }
        setLoading(false);
    }

    useFocusEffect(useCallback(() => { 
        loadNotes();
    }, [recents]));

    return(
        <Background>
            <View style={styles.menuBar}>
                <MenuBar title="Anotações" openMenu={openModal}/>
            </View> 

            <MenuModal 
                visible={modalVisibility} 
                closeModal={closeModal}
                goToAnotation={() => navigateToScreens("Home")}
                goToPostIts={() => navigateToScreens("PostIts")}
                goToSettings={() => navigateToScreens("Settings")}
            />

            <View style={styles.countingNotesContainer}>
                <Text style={styles.countingNotesText}>
                    {
                        notes.length === 1 ? `${notes.length} anotação salva`
                        : `${notes.length} anotações salvas`
                    }
                </Text>
                <RectButton style={styles.filterNotesContainer} onPress={changeRecents}>
                    <Text style={styles.filterNotesText}>
                        {recents ? "Ver mais antigos " : "Ver mais recentes "}
                    </Text>
                    {
                        recents ? 
                        <Ionicons 
                            name="md-chevron-down"
                            size={16}
                            color={theme.colors.gray}
                        /> :
                        <Ionicons
                            name="md-chevron-up"
                            size={16}
                            color={theme.colors.gray}
                        />
                    }
                </RectButton>
            </View>

            {
                (notes.length === 0 && loading === false) && 
                <View style={styles.placeholderContainer}>
                    <Text style={styles.placeholderText}>Você ainda não fez nenhuma anotação. Você pode iniciar clicando no botão de + logo abaixo.</Text>
                </View>
            }

            {
                loading ? <Loading/> :
                <FlatList
                    style={styles.notes}
                    data={notes}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:56}}
                    renderItem={
                        ({item}) => (
                            <Notes data={item} onPress={() => handleNotesUpdate(item)}/>
                        )
                    }
                />
            }

            <View style={styles.buttonPosition}>
                <ButtonAdd onPress={handleNotesCreate} icon={
                    <MaterialCommunityIcons
                        name="plus"
                        size={32}
                        color={theme.colors.textPrimary}
                    />
                }/>
            </View>        
        </Background>
    );
}