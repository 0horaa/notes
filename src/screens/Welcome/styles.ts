import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between",
        padding:24
    },
    test:{
        flex:1,
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontFamily:theme.fonts.primaryBold,
        fontSize:28,
        color:theme.colors.textPrimary,
        textAlign:"center",
        lineHeight:40,
        marginTop:"3%"
    },
    text:{
        fontFamily:theme.fonts.primaryRegular,
        fontSize:14,
        color:theme.colors.textSecondary,
        textAlign:"center",
        marginTop:"8%",
    },
    buttonContainer:{
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
    },
    button:{
        width:"80%",
        backgroundColor:theme.colors.main,
        padding:12,
        borderRadius:8
    },
    buttonText:{
        fontFamily:theme.fonts.primaryBold,
        fontSize:16,
        color:theme.colors.textPrimary,
        textAlign:"center"
    }
});