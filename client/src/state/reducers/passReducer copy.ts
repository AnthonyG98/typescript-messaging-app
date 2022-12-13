import { ActionType } from "../action-types";
import { Action } from "../actions/index"
const InitialState = "";

const reducer = (state: string = InitialState, action: Action)=>{
    switch(action.type){
        case ActionType.PASSWORD: 
            return action.payload;    
        case ActionType.PROFILE_PICTURE: 
            return 0;
        default: 
            return state

    }
}

export default reducer