import React from "react";
import {SvgProps} from "react-native-svg";

type Props = {
    icon:React.FC<SvgProps>;
}

export function IconWelcome({icon:Icon} : Props){
    return(
        <Icon width="85%" height={284}/>
    )
}