import { combineReducers } from "redux";
import startReducer from "./startReducer"
import passReducer from "./passReducer"
import searchReducer from "./searchReducer"
import chatReducer from "./chatReducer"
import messageReducer from "./messageReducer"


const reducers = combineReducers({
    user: startReducer,
    pass: passReducer,
    search: searchReducer,
    chat: chatReducer,
    message: messageReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>