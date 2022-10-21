import { Search } from "@mui/icons-material";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React from "react";
import Header from "../../components/Header";
import GuestsMenu from "../../components/GuestsMenu";
import styles from "./HomePage.module.scss";

const cities = ["London", "Munich", "Paris"];

const HomePage = () => {
	const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null]);

	return (
		<div className={styles.homePage}>
			<Header />
			<div className={styles.searchMenu}>
				<Autocomplete
					className={styles.autocomplete}
					options={cities}
					renderInput={(params) => <TextField {...params} label="Place" />}
					popupIcon={null}
				/>

				<LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: "Check-in", end: "Check-out" }}>
					<DateRangePicker
						value={value}
						onChange={(newValue) => setValue(newValue)}
						renderInput={(startProps, endProps) => (
							<React.Fragment>
								<TextField {...startProps} className={styles.dateRangePicker__field} />
								<Box sx={{ mx: 0.4 }}></Box>
								<TextField {...endProps} className={styles.dateRangePicker__field} />
							</React.Fragment>
						)}
					/>
				</LocalizationProvider>

				<GuestsMenu />

				<Button
					className={styles.searchButton}
					variant="contained"
					sx={{ padding: 0, fontSize: "1.1rem", textTransform: "none", fontWeight: "bold", color: "white" }}
				>
					<Search />
					<span className={styles.searchButton__text}>Search</span>
				</Button>
			</div>
		</div>
	);
};

export default HomePage;
