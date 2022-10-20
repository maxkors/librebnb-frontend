import { Search } from "@mui/icons-material";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React from "react";
import Header from "../../components/Header";
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
				<span style={{ width: "1rem" }}></span>
				<LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: "Check-in", end: "Check-out" }}>
					<DateRangePicker
						value={value}
						onChange={(newValue) => {
							setValue(newValue);
						}}
						renderInput={(startProps, endProps) => (
							<React.Fragment>
								<TextField {...startProps} />
								<Box sx={{ mx: 0.5 }}></Box>
								<TextField {...endProps} />
							</React.Fragment>
						)}
					/>
				</LocalizationProvider>
				<span style={{ width: "1rem" }}></span>
				<Button
					className={styles.searchButton}
					variant="contained"
					style={{ backgroundColor: "#00e08a", fontWeight: "bold", fontSize: "1rem" }}
				>
					<Search />
					&nbsp; Search &nbsp;
				</Button>
			</div>
		</div>
	);
};

export default HomePage;
