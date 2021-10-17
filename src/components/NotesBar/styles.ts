import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:8,
        justifyContent:"space-between"
    },
    input:{
        height:32,
        width:"75%",
        color:theme.colors.textPrimary,
        fontSize:18,
        fontFamily:theme.fonts.primaryBold,
    }
});