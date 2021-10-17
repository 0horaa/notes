import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import {AppRoutes} from "./app.routes";
import {Welcome} from "../screens/Welcome";

import {useWelcome} from "../hooks/welcome";

export function Routes(){
    const {hideWelcome} = useWelcome();

    return(
        <NavigationContainer>
            {hideWelcome ? <AppRoutes/> : <Welcome/>}
        </NavigationContainer>
    );
}