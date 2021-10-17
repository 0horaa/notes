import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";

export const styles = StyleSheet.create({
    item:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:20
    },
    textItem:{
        color:theme.colors.textSecondary,
        fontFamily:theme.fonts.primaryBold,
        fontSize:16,
        marginLeft:20
    }
});