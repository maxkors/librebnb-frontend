import styles from "./GuestsMenuItem.module.scss";
import { Button } from "@mui/material";

type Props = {
	guest: string;
};

const GuestsMenuItem = ({ guest }: Props) => {
	return (
		<div className={styles.guestMenuItem}>
			<span className={styles.guestName}>{guest}</span>
			{/* <div className="counter"> */}
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
			<span className={styles.value}>1</span>
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
			{/* </div> */}
		</div>
	);
};

export default GuestsMenuItem;
