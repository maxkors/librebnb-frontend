import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import "./App.scss";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import NavigationMobile from "./components/NavigationMobile";

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
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />
				</Routes>
				<NavigationMobile />
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
