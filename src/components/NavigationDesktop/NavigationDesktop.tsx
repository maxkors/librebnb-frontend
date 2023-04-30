import { Button, Dialog, DialogTitle, Menu, MenuItem, TextField } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationDesktop.module.scss";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Profile, setProfile } from "../../store/slices/profileSlice";

const NavigationDesktop = memo(() => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openLogInDialog, setOpenLogInDialog] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const usernameBurger = useSelector((state: RootState) => state.profileReducer.username);
	const isLoggedIn = useSelector((state: RootState) => state.profileReducer.isLoggedIn);
	const dispatch = useDispatch();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logInOnClick = () => {
		handleClose();
		setOpenLogInDialog(true);
	};

	const onSubmitClick = async () => {
		const formData = new FormData();
		formData.append("username", username);
		formData.append("password", password);
		console.log(formData);

		try {
			const response = await fetch("http://localhost:8080/api/login", {
				method: "POST",
				headers: {
					// "Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				credentials: "include",
				// body: JSON.stringify({ username, password }),
				body: formData,
			});

			// console.log({ username, password });

			if (response.ok) {
				setOpenLogInDialog(true);

				const profile = await response.json();
				console.log("PROFILE: ");
				console.log(profile);

				dispatch(setProfile({ username: profile.username, email: profile.email, isLoggedIn: true }));
				setOpenLogInDialog(false);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className={styles.navigationDesktop}>
			<Button
				onClick={handleClick}
				variant="outlined"
				className={styles.navigationButton}
				startIcon={<MenuOutlinedIcon />}
				sx={{
					borderRadius: "20px",
					textTransform: "none",
					fontSize: "1rem",
				}}
			>
				{usernameBurger}
			</Button>

			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				{isLoggedIn ? (
					<div>
						<MenuItem onClick={handleClose}>
							<NavLink to="/" className={styles.navLink}>
								Explore
							</NavLink>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<NavLink to="/" className={styles.navLink}>
								Wishlist
							</NavLink>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<NavLink to="/" className={styles.navLink}>
								Inbox
							</NavLink>
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<NavLink to="/" className={styles.navLink}>
								Profile
							</NavLink>
						</MenuItem>
					</div>
				) : (
					<div>
						<MenuItem>Sign up</MenuItem>
						<MenuItem onClick={logInOnClick}>Log in</MenuItem>
					</div>
				)}
			</Menu>

			<Dialog open={openLogInDialog} onClose={() => setOpenLogInDialog(false)}>
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
					<span className={styles.searchButton__text}>Submit</span>
				</Button>
			</Dialog>
		</div>
	);
});

export default NavigationDesktop;
