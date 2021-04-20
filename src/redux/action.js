import {SHOW_APP_DETAIL} from "./const";

export const showDetail=(data)=>{
    return{
        type:SHOW_APP_DETAIL,
        payload:data,
    }
}