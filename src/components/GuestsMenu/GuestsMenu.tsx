import { useState } from "react";
import styles from "./GuestsMenu.module.scss";
import { ThemeProvider } from "@emotion/react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, createTheme, Menu } from "@mui/material";
import GuestsMenuItem from "./GuestsMenuItem";

const GuestsMenu = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={styles.guestsMenu}>
			<Button
				onClick={handleClick}
				variant="outlined"
				endIcon={<KeyboardArrowDown />}
				className={styles.guestsButton}
				sx={{
					// borderColor: "#b9b9b9",
					// color: "#707070",
					textTransform: "none",
					fontSize: "1rem",
					fontWeight: "normal",
					padding: 0,
				}}
				// color="secondary"
			>
				Guests
			</Button>

			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				{["Adults", "Children", "Pets"].map((item, index) => (
					<GuestsMenuItem guest={item} key={index} />
				))}
			</Menu>
		</div>
	);
};

export default GuestsMenu;
