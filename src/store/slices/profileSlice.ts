import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Profile = {
	username: string;
	email: string;
	isLoggedIn: boolean;
};

const initialState: Profile = {
	username: "Guest",
	email: "",
	isLoggedIn: false,
};

export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setProfile: (state, action: PayloadAction<Profile>) => {
			state.username = action.payload.username;
			state.email = action.payload.email;
			// state = action.payload;
		},
		clearProfile: (state) => {
			state.username = "Guest";
			state.email = "";
		},
	},
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
