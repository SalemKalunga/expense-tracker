import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./root-reducer";

const myMiddleWare = (state) => (next) => (action) => {
  console.log("ACTION: ", action.type);
  console.log("PAYLOAD: ", action.payload);
  console.log("CURRENT_STATE: ", state.getState());
  next(action);
  console.log("NEW_STATE: ", state.getState());
};

const middleWares = [myMiddleWare];
const enhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, enhancers);
