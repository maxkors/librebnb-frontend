import { Chip, IconButton } from "@mui/material";
import { memo } from "react";
import styles from "./SearchFormStatus.module.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PersonIcon from "@mui/icons-material/Person";

type Props = {
	name: string;
	dates: string;
	guests: string;
	setShowSearchForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchFormStatus = memo(({ name, dates, guests, setShowSearchForm }: Props) => {
	return (
		<Chip
			className={styles.searchFormStatus}
			label={
				<p className={styles.label}>
					<PlaceIcon sx={{ fontSize: "1rem" }} />
					<span>{name}</span>
					<DateRangeIcon sx={{ fontSize: "1rem" }} />
					<span>{dates}</span>
					<PersonIcon sx={{ fontSize: "1rem" }} />
					<span>{guests}</span>
					<IconButton
						sx={{
							backgroundColor: "#54d1ca",
							width: "2rem",
							height: "2rem",
							position: "relative",
							right: "-7px",
						}}
					>
						<SearchOutlinedIcon sx={{ color: "white", fontSize: "1.3rem" }} />
					</IconButton>
				</p>
			}
			onClick={() => setShowSearchForm((prev) => !prev)}
			variant="outlined"
			sx={{ height: "2.5rem", borderRadius: "20px" }}
		/>
	);
});

export default SearchFormStatus;
