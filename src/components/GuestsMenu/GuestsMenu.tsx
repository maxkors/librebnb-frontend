import { useState } from "react";
import styles from "./GuestsMenu.module.scss";
import { ThemeProvider } from "@emotion/react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, createTheme, Menu } from "@mui/material";

const GuestsMenu = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={styles.guestMenu}>
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
					<div key={index}>
						<span>{item}</span>
						<div className="counter">
							<Button
								variant="outlined"
								className={styles.counterButton}
								sx={{
									fontSize: "1.7rem",
									padding: 0,
									minWidth: 0,
									borderRadius: "50%",
								}}
							>
								-
							</Button>
							<span>1</span>
							<Button
								variant="outlined"
								className={styles.counterButton}
								sx={{
									fontSize: "1.7rem",
									padding: 0,
									minWidth: 0,
									borderRadius: "50%",
								}}
							>
								+
							</Button>
						</div>
					</div>
				))}
			</Menu>
		</div>
	);
};

export default GuestsMenu;
