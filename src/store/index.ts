import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import profileReducer from "./slices/profileSlice";
import popupReducer from "./slices/popupSlice";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		popup: popupReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
