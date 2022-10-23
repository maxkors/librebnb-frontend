import { memo, SyntheticEvent, useState } from "react";
import styles from "./SearchForm.module.scss";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Search } from "@mui/icons-material";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GuestsMenu from "../../components/GuestsMenu";
import Autocompletion from "../Autocompletion";

export type Place = {
	name: string;
	bbox: number[];
};

export type Guests = {
	adults: number;
	children: number;
	pets: number;
};

const SearchForm = memo(() => {
	const [value, setValue] = useState<Place>({ name: "", bbox: [] });
	const [date, setDate] = useState<DateRange<Dayjs>>([null, null]);
	const [guests, setGuests] = useState<Guests>({ adults: 0, children: 0, pets: 0 });

	return (
		<div className={styles.searchMenu}>
			<Autocompletion value={value} setValue={setValue} />

			<LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: "Check-in", end: "Check-out" }}>
				<DateRangePicker
					value={date}
					onChange={(newDate) => {
						console.log("newDate: ");
						console.log(newDate);
						setDate(newDate);
					}}
					onClose={() => {
						// @ts-ignore
						setTimeout(() => document.activeElement?.blur());
					}}
					renderInput={(startProps, endProps) => (
						<>
							<TextField {...startProps} className={styles.dateRangePicker__field} />
							<Box sx={{ mx: 0.4 }}></Box>
							<TextField {...endProps} className={styles.dateRangePicker__field} />
						</>
					)}
				/>
			</LocalizationProvider>

			<GuestsMenu guests={guests} setGuests={setGuests} />

			<Button
				className={styles.searchButton}
				variant="contained"
				onClick={() => {
					console.log("result: ");
					console.log(value);
					console.log(date);
					console.log(guests);
				}}
				sx={{ padding: 0, fontSize: "1.1rem", textTransform: "none", fontWeight: "bold", color: "white" }}
			>
				<Search />
				<span className={styles.searchButton__text}>Search</span>
			</Button>
		</div>
	);
});

export default SearchForm;
