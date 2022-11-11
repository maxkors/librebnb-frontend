import { memo, useState } from "react";
import styles from "./SearchForm.module.scss";
import { Box, Button, TextField } from "@mui/material";
import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Search } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GuestsMenu from "../../components/GuestsMenu";
import Autocompletion from "../Autocompletion";
import { createSearchParams, useNavigate } from "react-router-dom";

export type Place = {
	name: string;
	bbox: number[];
};

export type Guests = {
	adults: number;
	children: number;
	pets: number;
};

export type ElementSize = "small" | "medium" | undefined;

type Props = {
	style?: React.CSSProperties;
	formSize?: ElementSize;
	name: string;
	SWLng: number;
	SWLat: number;
	NELng: number;
	NELat: number;
	checkin: string | null;
	checkout: string | null;
	adults: number;
	children: number;
	pets: number;
};

//TODO add memo() compare function with Lodash.isEqual for objects
const SearchForm = memo(
	({ style, formSize, name, SWLng, SWLat, NELng, NELat, checkin, checkout, adults, children, pets }: Props) => {
		const [place, setPlace] = useState<Place>({ name: name, bbox: [SWLng, SWLat, NELng, NELat] });
		const [date, setDate] = useState<DateRange<Dayjs>>([
			checkin ? dayjs(checkin) : null,
			checkout ? dayjs(checkout) : null,
		]);
		const [guests, setGuests] = useState<Guests>({ adults: adults, children: children, pets: pets });
		const navigate = useNavigate();

		const onButtonClick = () => {
			if (place.name !== "" && place.bbox.length > 0 && date[0] !== null && date[1] !== null) {
				console.log("result: ");
				console.log(place);
				console.log(date);
				console.log(guests);
				console.log(date[0].format("YYYY-MM-DD") + " " + date[1].format("YYYY-MM-DD"));

				const params: URLSearchParams = createSearchParams();

				params.set("name", place.name);
				params.set("checkin", date[0].format("YYYY-MM-DD"));
				params.set("checkout", date[1].format("YYYY-MM-DD"));
				if (guests.adults > 0) params.set("adults", guests.adults.toString());
				if (guests.children > 0) params.set("children", guests.children.toString());
				if (guests.pets > 0) params.set("pets", guests.pets.toString());
				params.set("sw_lng", place.bbox[0].toString());
				params.set("sw_lat", place.bbox[1].toString());
				params.set("ne_lng", place.bbox[2].toString());
				params.set("ne_lat", place.bbox[3].toString());

				navigate("/search?" + params.toString());
			}
		};

		return (
			<div className={styles.searchMenu} style={style}>
				<Autocompletion value={place} setValue={setPlace} size={formSize} />

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
						// disableMaskedInput
						inputFormat="DD.MM.YYYY"
						renderInput={(startProps, endProps) => (
							<>
								<TextField {...startProps} className={styles.dateRangePicker__field} size={formSize} />
								<Box sx={{ mx: 0.4 }}></Box>
								<TextField {...endProps} className={styles.dateRangePicker__field} size={formSize} />
							</>
						)}
					/>
				</LocalizationProvider>

				<GuestsMenu guests={guests} setGuests={setGuests} size={formSize} />

				<Button
					className={styles.searchButton}
					variant="contained"
					onClick={onButtonClick}
					size={formSize}
					sx={{
						padding: 0,
						fontSize: "1.1rem",
						textTransform: "none",
						fontWeight: "bold",
						color: "white",
						height: formSize === "small" ? "2.5rem" : null,
					}}
				>
					<Search />
					<span className={styles.searchButton__text}>Search</span>
				</Button>
			</div>
		);
	}
);

export default SearchForm;
