import { combineReducers } from "redux";
import startReducer from "./startReducer"
import passReducer from "./passReducer"
import searchReducer from "./searchReducer"
import chatReducer from "./chatReducer"


const reducers = combineReducers({
    user: startReducer,
    pass: passReducer,
    search: searchReducer,
    chat: chatReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>