import { useState } from "react";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../store/slices/profileSlice";
import { RootState } from "../../store";
import { setIsLogInPopupOpen } from "../../store/slices/popupSlice";

const LogInPopup = () => {
	const isLogInPopupOpen = useSelector((state: RootState) => state.popup.isLogInPopupOpen);
	const dispatch = useDispatch();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const onSubmitClick = async () => {
		const formData = new FormData();
		formData.append("username", username);
		formData.append("password", password);
		console.log(formData);

		try {
			// const response = await fetch("http://localhost:8080/api/login", {
			const response = await fetch(`${process.env.REACT_APP_API}/login`, {
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
				credentials: "include",
				body: formData,
			});

			if (response.ok) {
				const profile = await response.json();
				console.log("PROFILE: ");
				console.log(profile);

				dispatch(setProfile({ username: profile.username, email: profile.email, isLoggedIn: true }));
				dispatch(setIsLogInPopupOpen(false));
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Dialog open={isLogInPopupOpen} onClose={() => dispatch(setIsLogInPopupOpen(false))}>
			<DialogTitle>Log in</DialogTitle>

			<TextField
				label="Username"
				type="text"
				style={{ margin: "0.5rem 2rem" }}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setUsername(event.target.value);
				}}
			/>
			<TextField
				label="Password"
				type="password"
				style={{ margin: "0.5rem 2rem" }}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setPassword(event.target.value);
				}}
			/>
			<Button
				variant="contained"
				onClick={onSubmitClick}
				sx={{
					fontSize: "1.1rem",
					textTransform: "none",
					fontWeight: "bold",
					color: "white",
					height: "2.5rem",
					margin: "1rem 2rem 2rem 2rem",
				}}
			>
				<span>Submit</span>
			</Button>
		</Dialog>
	);
};

export default LogInPopup;
