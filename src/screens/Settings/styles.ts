import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
    menuBar:{
        width:"100%",
        paddingHorizontal:24,
        marginTop:getStatusBarHeight() + 26,
        flexDirection:"row",
        alignItems:"center"
    },
    settings:{
        marginTop:24,
        marginHorizontal:24
    },
    settingsContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    textSettings:{
        fontFamily:theme.fonts.primaryRegular,
        fontSize:14,
        color:theme.colors.textSecondary
    },
    switch:{
        transform:[{scaleX:1.2}, {scaleY:1.2}]
    }
});