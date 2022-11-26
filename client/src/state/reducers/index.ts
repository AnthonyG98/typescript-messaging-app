import { combineReducers } from "redux";
import startReducer from "./startReducer"
import passReducer from "./passReducer"

const reducers = combineReducers({
    user: startReducer,
    pass: passReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>