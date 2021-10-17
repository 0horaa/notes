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
    countingNotesContainer:{
        marginTop:24,
        marginHorizontal:24,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    countingNotesText:{
        fontFamily:theme.fonts.primaryRegular,
        fontSize:14,
        color:theme.colors.gray
    },
    filterNotesContainer:{
        flexDirection:"row",
        alignItems:"center"
    },
    filterNotesText:{
        fontFamily:theme.fonts.primaryRegular,
        fontSize:12,
        color:theme.colors.gray
    },
    placeholderContainer:{
        flex:1,
        minHeight:"65%",
        justifyContent:"center",
        alignItems:"center"
    },
    placeholder:{
        fontFamily:theme.fonts.primaryRegular,
        fontSize:12,
        color:theme.colors.gray,
        textAlign:"center",
        paddingHorizontal:24
    },
    postIts:{
        marginTop:6,
        marginHorizontal:24,
    },
    buttonPosition:{
        position:"absolute",
        bottom:42,
        right:42
    }
});