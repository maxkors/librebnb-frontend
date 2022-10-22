import { SyntheticEvent, useState } from "react";
import styles from "./SearchForm.module.scss";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Search } from "@mui/icons-material";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GuestsMenu from "../../components/GuestsMenu";

type Place = {
	name: string;
	bbox: number[];
};

export type Guests = {
	adults: number;
	children: number;
	pets: number;
};

const SearchForm = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const [places, setPlaces] = useState<Place[]>([]);
	const [value, setValue] = useState<string>("");

	const [date, setDate] = useState<DateRange<Dayjs>>([null, null]);

	const [guests, setGuests] = useState<Guests>({ adults: 0, children: 0, pets: 0 });

	const getPlaces = async (input: string) => {
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?proximity=ip&types=place%2Ccountry%2Clocality&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
		);
		const data = await response.json();

		const fetchedPlaces = data.features.map((feature: any) => ({
			name: feature.place_name,
			bbox: feature.bbox,
		}));

		console.log("fetchedPlaces: ");
		console.log(fetchedPlaces);
		return fetchedPlaces;
	};

	const onInputChange = (event: SyntheticEvent<Element, Event>, newInputValue: string) => {
		setInputValue(newInputValue);
		if (newInputValue !== "") {
			getPlaces(newInputValue).then((places) => setPlaces(places));
		}
	};

	const onChange = (event: SyntheticEvent<Element, Event>, newValue: string | null) => {
		console.log("onChange: ");
		console.log(newValue);
		if (newValue !== null) {
			setInputValue(newValue);
			setValue(newValue);
		}
	};

	return (
		<div className={styles.searchMenu}>
			<Autocomplete
				className={styles.autocomplete}
				inputValue={inputValue}
				onInputChange={onInputChange}
				value={value}
				onChange={onChange}
				options={places.map((place) => place.name)}
				renderInput={(params) => <TextField {...params} label="Place" />}
				popupIcon={null}
				freeSolo
				blurOnSelect
				selectOnFocus
			/>

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
						setTimeout(() => document.activeElement.blur());
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
					console.log("place: ");
					console.log(places.find((place) => place.name === value));
				}}
				sx={{ padding: 0, fontSize: "1.1rem", textTransform: "none", fontWeight: "bold", color: "white" }}
			>
				<Search />
				<span className={styles.searchButton__text}>Search</span>
			</Button>
		</div>
	);
};

export default SearchForm;
