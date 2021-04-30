import {combineReducers} from "redux";
import userReducer from "./user";
import toggleReducer from "./toggle"

const rootReducer = combineReducers({
    user: userReducer,
    togglePage: toggleReducer 
    
})
export default rootReducer;