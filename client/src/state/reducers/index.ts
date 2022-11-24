import { combineReducers } from "redux";
import startReducer from "./startReducer"


const reducers = combineReducers({
    user: startReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>