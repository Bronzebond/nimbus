import { combineReducers } from "redux";
import questionReducer from "./question.reducer";
import authReducer from "./auth.reducer";

export default combineReducers({
  question: questionReducer,
  auth: authReducer,
});
