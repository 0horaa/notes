import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
    header:{
        width:"100%",
        marginTop:getStatusBarHeight() + 26,
        paddingHorizontal:24,
        borderBottomWidth:1,
        borderBottomColor:theme.colors.gray
    },
    writePostIts:{
        flex:1,
        padding:24,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:24
    },
    input:{
        width:"100%",
        height:220,
        padding:24,
        textAlign:"center",
        color:theme.colors.backgroundSecundary,
        fontSize:22,
        fontFamily:theme.fonts.secondaryRegular
    },
    optionsPostIts:{
        width:"100%",
        marginTop:16,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    button:{
        backgroundColor:theme.colors.main,
        borderRadius:8,
        padding:1
    }
});