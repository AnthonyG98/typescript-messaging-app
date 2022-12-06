import { ActionType } from "../action-types";
import { Action } from "../actions/index"
const InitialState = "";

const reducer = (state: string = InitialState, action: Action)=>{
    switch(action.type){
        case ActionType.USERNAME: 
            return action.payload; 
        case ActionType.PROFILE_PICTURE: 
            return 0;
        case ActionType.SEARCH:
            return action.payload;
        default: 
            return state
    }
}

export default reducer