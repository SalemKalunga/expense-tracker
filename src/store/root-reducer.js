import { combineReducers } from "redux";
import { popupActionsReducer } from "./popup/popup.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  popup: popupActionsReducer,
});
