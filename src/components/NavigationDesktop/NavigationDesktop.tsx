import { Button, Menu, MenuItem } from "@mui/material";
import { memo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./NavigationDesktop.module.scss";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogInPopupOpen } from "../../store/slices/popupSlice";
import { clearProfile } from "../../store/slices/profileSlice";

const NavigationDesktop = memo(() => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const profileUsername = useSelector((state: RootState) => state.profile.username);
	const isLoggedIn = useSelector((state: RootState) => state.profile.isLoggedIn);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const logInOnClick = () => {
		handleMenuClose();
		dispatch(setIsLogInPopupOpen(true));
	};

	const logOutOnClick = async () => {
		handleMenuClose();

		try {
			// const response = await fetch("http://localhost:8080/api/logout", {
			const response = await fetch(`${process.env.REACT_APP_API}/logout`, {
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
				credentials: "include",
			});

			if (response.status === 401) {
				dispatch(clearProfile());
				navigate("/");
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className={styles.navigationDesktop}>
			<Button
				onClick={handleMenuClick}
				variant="outlined"
				className={styles.navigationButton}
				startIcon={<MenuOutlinedIcon />}
				sx={{
					borderRadius: "20px",
					textTransform: "none",
					fontSize: "1rem",
				}}
			>
				{profileUsername}
			</Button>

			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
				{isLoggedIn ? (
					<div>
						<MenuItem onClick={handleMenuClose}>
							<NavLink to="/" className={styles.navLink}>
								Explore
							</NavLink>
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>
							<NavLink to="/" className={styles.navLink}>
								Wishlist
							</NavLink>
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>
							<NavLink to="/" className={styles.navLink}>
								Inbox
							</NavLink>
						</MenuItem>
						<MenuItem onClick={handleMenuClose}>
							<NavLink to="/profile" className={styles.navLink}>
								Profile
							</NavLink>
						</MenuItem>
						<MenuItem onClick={logOutOnClick}>Log out</MenuItem>
					</div>
				) : (
					<div>
						<MenuItem>Sign up</MenuItem>
						<MenuItem onClick={logInOnClick}>Log in</MenuItem>
					</div>
				)}
			</Menu>
		</div>
	);
});

export default NavigationDesktop;
