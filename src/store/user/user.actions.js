import { USER_ACTIONS } from "./user.action-types";

export const setCurrentUser = (currentUser) => ({
  type: USER_ACTIONS.SET_CURRENT_USER,
  payload: currentUser,
});
