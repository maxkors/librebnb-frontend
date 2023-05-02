import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	isLogInPopupOpen: false,
};

export const popupSlice = createSlice({
	name: "popup",
	initialState,
	reducers: {
		setIsLogInPopupOpen: (state, action: PayloadAction<boolean>) => {
			state.isLogInPopupOpen = action.payload;
		},
	},
});

export const { setIsLogInPopupOpen } = popupSlice.actions;

export default popupSlice.reducer;
