import { Button, Menu, MenuItem } from "@mui/material";
import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationDesktop.module.scss";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const NavigationDesktop = memo(() => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const username = useSelector((state: RootState) => state.profileReducer.username);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
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
				{username}
			</Button>

			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
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
			</Menu>
		</div>
	);
});

export default NavigationDesktop;
