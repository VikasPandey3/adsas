import {SHOW_APP_DETAIL} from "./const";

const  detail={
    apps:[]
};

export const MyappDetailErducer=(state=detail,action)=>{
    switch (action.type) {
        case SHOW_APP_DETAIL:
            return{
                ...state,
                apps:action.payload
            }
    
        default:
            return state
    }
}