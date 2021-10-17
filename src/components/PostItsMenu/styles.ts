import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:8
    },
    text:{
        flex:1,
        textAlign:"center",
        color:theme.colors.textPrimary,
        fontFamily:theme.fonts.primaryBold,
        fontSize:18,
    }
});