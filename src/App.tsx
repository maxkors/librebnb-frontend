import { Search } from "@mui/icons-material";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { DateRange, DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React from "react";
import "./App.scss";
import Comp from "./Comp";

const cities = ["London", "Munich", "Paris"];

function App() {
	const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null]);

	return (
		<div className="app">
			<Comp />
			<div style={{ display: "flex", padding: "10px" }}>
				<Autocomplete
					options={cities}
					renderInput={(params) => <TextField {...params} label="Place" />}
					style={{ width: "15rem" }}
					popupIcon={null}
					size="medium"
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
				<Button variant="contained" style={{ backgroundColor: "#00e08a", fontWeight: "bold" }}>
					<Search />
					&nbsp; Search &nbsp;
				</Button>
			</div>
		</div>
	);
}

export default App;
