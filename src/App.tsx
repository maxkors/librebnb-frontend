import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useDispatch } from "react-redux";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import NavigationMobile from "./components/NavigationMobile";
import { setProfile } from "./store/slices/profileSlice";
import LogInPopup from "./components/LogInPopup";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

let theme = createTheme({
	palette: {
		// primary: {
		// 	main: "#00e08a",
		// 	// main: "#02b36f",
		// },
		// secondary: {
		// 	main: "rgba(0, 0, 0, 0.87)",
		// },
	},
});

const App = () => {
	const dispatch = useDispatch();

	const getProfileDetails = async () => {
		const response = await fetch(`${process.env.REACT_APP_API}/profile`);

		if (response.ok) {
			const profile = await response.json();
			console.log(`Profile: `);
			console.log(profile);
			dispatch(setProfile({ username: profile.username, email: profile.email, isLoggedIn: true }));
		}
	};

	getProfileDetails();

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path="/profile" element={<ProfilePage />} />
				</Routes>
				<NavigationMobile />
			</BrowserRouter>
			<LogInPopup />
		</ThemeProvider>
	);
};

export default App;
