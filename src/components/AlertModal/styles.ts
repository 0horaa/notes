import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";

export const styles = StyleSheet.create({
    overlay:{
        flex:1,
        backgroundColor:theme.colors.overlay,
        justifyContent:"center",
        alignItems:"center"
    },
    container:{
        width:"90%",
        backgroundColor:theme.colors.backgroundSecundary,
        borderRadius:8,
        padding:24
    },
    title:{
        fontFamily:theme.fonts.primaryBold,
        fontSize:20,
        color:theme.colors.textPrimary,
        marginBottom:10
    },
    text:{
        fontFamily:theme.fonts.primaryRegular,
        fontSize:14,
        color:theme.colors.textSecondary,
        marginBottom:10
    },
    buttonsContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-end"
    },
    buttons:{
        width:46,
        height:32,
    },
    textButton:{
        fontFamily:theme.fonts.primaryRegular,
        fontSize:18,
        color:theme.colors.main
    }
});