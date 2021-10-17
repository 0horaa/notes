import {StyleSheet} from "react-native";
import {theme} from "../../global/styles/theme";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
    overlay:{
        flex:1,
        backgroundColor:theme.colors.overlay
    },
    container:{
        flex:1,
        marginRight:"30%"
    },
    items:{
        marginTop:getStatusBarHeight() + 80,
        paddingHorizontal:24
    }
});