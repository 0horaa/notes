import React, {useState, useEffect} from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {Home} from "../screens/Home/index";
import {NotesCreate} from "../screens/NotesCreate/index";
import {PostIts} from "../screens/PostIts/index";
import {PostItsCreate} from "../screens/PostItsCreate/index";
import {Settings} from "../screens/Settings/index";

const {Navigator, Screen} = createStackNavigator();

export function AppRoutes(){
    return(
        <Navigator
            screenOptions={
                {
                    headerShown:false,
                    cardStyle:{
                        backgroundColor:"#080c14"
                    }
                }                
            }
        >    
            <Screen name="Home" component={Home}/>
            <Screen name="NotesCreate" component={NotesCreate}/>
            <Screen name="PostIts" component={PostIts}/>
            <Screen name="PostItsCreate" component={PostItsCreate}/>
            <Screen name="Settings" component={Settings}/>   
        </Navigator>
    );
}