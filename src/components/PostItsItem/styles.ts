import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"100%",
        height:220,
        marginBottom:18
    },
    buttonContainer:{
        flex:1,
        width:"100%",
        padding:20,
        justifyContent:"center",
    },
    text:{
        fontFamily:theme.fonts.secondaryRegular,
        fontSize:22,
        textAlign:"center",
        color:theme.colors.backgroundSecundary
    }
});