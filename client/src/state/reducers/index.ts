import { combineReducers } from "redux";
import startReducer from "./startReducer"
import passReducer from "./passReducer"
import searchReducer from "./searchReducer"


const reducers = combineReducers({
    user: startReducer,
    pass: passReducer,
    search: searchReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>