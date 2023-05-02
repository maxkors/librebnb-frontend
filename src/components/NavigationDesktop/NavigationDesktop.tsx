import { Button, Dialog, DialogTitle, Menu, MenuItem, TextField } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationDesktop.module.scss";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Profile, setProfile } from "../../store/slices/profileSlice";
import { setIsLogInPopupOpen } from "../../store/slices/popupSlice";

const NavigationDesktop = memo(() => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const profileUsername = useSelector((state: RootState) => state.profile.username);
	const isLoggedIn = useSelector((state: RootState) => state.profile.isLoggedIn);
	const dispatch = useDispatch();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logInOnClick = () => {
		handleClose();
		dispatch(setIsLogInPopupOpen(true));
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
				{profileUsername}
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
		</div>
	);
});

export default NavigationDesktop;
