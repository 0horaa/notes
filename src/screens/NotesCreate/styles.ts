import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
    header:{
        width:"100%",
        paddingHorizontal:24,
        marginTop:getStatusBarHeight() + 26,
        borderBottomWidth:1,
        borderBottomColor:theme.colors.gray
    },
    inputNotes:{
        flex:1,
        width:"100%",
        height:"100%",
        textAlignVertical:"top",
        paddingHorizontal:30,
        marginVertical:24,
        color:theme.colors.textSecondary,
        fontSize:16,
        fontFamily:theme.fonts.primaryRegular
    },
    buttonPosition:{
        position:"absolute",
        bottom:42,
        right:42
    }
});