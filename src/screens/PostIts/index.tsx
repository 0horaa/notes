import React, {useState, useCallback} from "react";
import {View, Text, FlatList} from "react-native";
import {useNavigation, useFocusEffect} from "@react-navigation/native";
import {RectButton} from "react-native-gesture-handler";
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Ionicons} from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {COLLECTION_POSTITS} from "../../config/storage";

import {Background} from "../../components/Background/index";
import {MenuBar} from "../../components/MenuBar/index";
import {MenuModal} from "../../components/MenuModal/index";
import {ButtonAdd} from "../../components/ButtonAdd/index";
import {Loading} from "../../components/Loading/index";
import {PostItsItem} from "../../components/PostItsItem/index";

import {styles} from "./styles";
import {theme} from "../../global/styles/theme";
import {PostItProps} from "../../global/types/data";

export function PostIts(){
    const [recents, setRecents] = useState(true);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [postIts, setPostIts] = useState<PostItProps[]>([]);
    const [loading, setLoading] = useState(true);
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

    function handlePostItsCreate(){
        navigation.navigate("PostItsCreate");
    }

    function handlePostItsUpdate(postItSelected : PostItProps){
        navigation.navigate("PostItsCreate", {postItSelected});
    }

    async function loadPostIts(){
        const storedPostIts = await AsyncStorage.getItem(COLLECTION_POSTITS);
        const storage : PostItProps[] = storedPostIts ? JSON.parse(storedPostIts) : [];

        if(recents){
            setPostIts(storage.reverse());
        }else{
            setPostIts(storage);
        }
        setLoading(false);
    }
    useFocusEffect(useCallback(() => {
        loadPostIts();
    }, [recents]));
    
    return(
        <Background>
            <View style={styles.menuBar}>
                <MenuBar title="Post-its" openMenu={openModal}/>
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
                        postIts.length === 1 ? `${postIts.length} post-it salvo`
                        : `${postIts.length} post-its salvos`
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
                (postIts.length === 0 && loading === false) && 
                <View style={styles.placeholderContainer}>
                    <Text style={styles.placeholder}>Os post-its são muito úteis pra lembrar de ideias curtas e organiza-las de maneira rápida e prática. Inicie clicando no botão de + logo abaixo.</Text>
                </View>
            }

            {
                loading ? <Loading/> :
                <FlatList
                    style={styles.postIts}
                    data={postIts}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:56}}
                    renderItem={
                        ({item}) => (
                            <PostItsItem data={item} onPress={() => handlePostItsUpdate(item)}/>
                        )
                    }
                />
            }

            <View style={styles.buttonPosition}>
                <ButtonAdd onPress={handlePostItsCreate} icon={
                    <MaterialCommunityIcons
                        name="plus"
                        size={32}
                        color={theme.colors.textPrimary}
                    />
                }/>
            </View>
        </Background>
    )
}