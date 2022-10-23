import { memo, useState } from "react";
import styles from "./GuestsMenu.module.scss";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Menu } from "@mui/material";
import GuestsMenuItem from "./GuestsMenuItem";
import { Guests } from "../SearchForm/SearchForm";

type Props = {
	guests: Guests;
	setGuests: (guests: Guests) => void;
};

const GuestsMenu = memo(({ guests, setGuests }: Props) => {
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
				Guests{guests.adults + guests.children > 0 ? ` (${guests.adults + guests.children})` : ""}
			</Button>

			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				{Object.entries(guests).map((entry, index) => (
					<GuestsMenuItem key={index} guest={entry[0]} quantity={entry[1]} setGuests={setGuests} />
				))}
			</Menu>
		</div>
	);
});

export default GuestsMenu;
