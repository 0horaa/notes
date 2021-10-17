import React, {createContext, useContext, useEffect, useState, ReactNode} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {COLLECTION_WELCOME} from "../config/storage";

type WelcomeContextData = {
    hideWelcome:boolean;
    changeWelcomeVisibility:() => Promise<void>;
}
export const WelcomeContext = createContext({} as WelcomeContextData);

type WelcomeContextProps = {
    children:ReactNode;
}
function WelcomeProvider({children} : WelcomeContextProps){
    const [hideWelcome, setHideWelcome] = useState(false);

    async function changeWelcomeVisibility(){
        await AsyncStorage.setItem(
            COLLECTION_WELCOME,
            "true"
        );
        setHideWelcome(true);
    }

    async function loadStorageData(){
        const storage = await AsyncStorage.getItem(COLLECTION_WELCOME);
        if(storage){
            setHideWelcome(true);
        }
    }
    useEffect(() => {
        loadStorageData();
    }, [])

    return(
        <WelcomeContext.Provider value={{
            hideWelcome:hideWelcome,
            changeWelcomeVisibility:changeWelcomeVisibility
        }}>
            {children}
        </WelcomeContext.Provider>
    );
}

function useWelcome(){
    const context = useContext(WelcomeContext);
    return context;
}

export{WelcomeProvider, useWelcome};