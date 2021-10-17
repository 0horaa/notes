import React from "react";
import {StatusBar} from "react-native";
import {useFonts} from "expo-font";
import {NotoSans_400Regular, NotoSans_700Bold} from "@expo-google-fonts/noto-sans";
import {ArchitectsDaughter_400Regular} from "@expo-google-fonts/architects-daughter";
import AppLoading from "expo-app-loading";

import {Background} from "./src/components/Background/index";
import {Routes} from "./src/routes/index";
import {WelcomeProvider} from "./src/hooks/welcome";

export default function App(){
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
    ArchitectsDaughter_400Regular
  });

  if(!fontsLoaded){
    return(<AppLoading/>);
  }

  return(
    <Background>
        <StatusBar
            barStyle={"light-content"}
            backgroundColor="transparent"
            translucent={true}
        />
        <WelcomeProvider>
            <Routes/>
        </WelcomeProvider>
    </Background>
  );
}