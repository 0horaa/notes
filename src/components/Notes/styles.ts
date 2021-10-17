import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:18
    },
    notesContainer:{
        flex:1,
        width:"100%",
        borderRadius:8,
        alignItems:"center",
        justifyContent:"center"
    },
    buttonContainer:{
        flex:1,
        width:"100%"
    },
    textContainer:{
        flex:1,
        padding:12
    },
    title:{
        fontFamily:theme.fonts.primaryBold,
        fontSize:14,
        color:theme.colors.textPrimary,
        marginBottom:6
    },
    date:{
        fontFamily:theme.fonts.primaryRegular,
        fontSize:12,
        color:theme.colors.gray,
        marginBottom:6
    },
    text:{
        fontFamily:theme.fonts.primaryRegular,
        fontSize:12,
        color:theme.colors.textSecondary
    }
});