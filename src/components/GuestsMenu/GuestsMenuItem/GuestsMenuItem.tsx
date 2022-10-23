import { memo } from "react";
import styles from "./GuestsMenuItem.module.scss";
import { Button } from "@mui/material";
import { Guests } from "../../SearchForm/SearchForm";

type Props = {
	guest: string;
	quantity: number;
	setGuests: React.Dispatch<React.SetStateAction<Guests>>;
};

const GuestsMenuItem = memo(({ guest, quantity, setGuests }: Props) => {
	const decrease = () => {
		setGuests((prev: Guests) => {
			if (prev[guest as keyof Guests] <= 0) {
				return prev;
			}
			return { ...prev, [guest]: prev[guest as keyof Guests] - 1 };
		});
	};

	const increase = () => {
		setGuests((prev: Guests) => {
			return { ...prev, [guest]: prev[guest as keyof Guests] + 1 };
		});
	};

	return (
		<div className={styles.guestMenuItem}>
			<span className={styles.guestName}>{guest}</span>
			<Button
				className={styles.counterButton}
				onClick={decrease}
				variant="outlined"
				sx={{
					fontSize: "1.7rem",
					padding: 0,
					minWidth: 0,
					borderRadius: "50%",
				}}
			>
				-
			</Button>
			<span className={styles.quantity}>{quantity}</span>
			<Button
				className={styles.counterButton}
				onClick={increase}
				variant="outlined"
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
	);
});

export default GuestsMenuItem;
