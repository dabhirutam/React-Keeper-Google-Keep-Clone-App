import { combineReducers } from "redux";
import NotesReducer from "./reducers/NotesReducer";
import AuthReducer from "./reducers/AuthReducer";


const RootReducer = combineReducers({
    NotesReducer,
    AuthReducer
})

export default RootReducer;