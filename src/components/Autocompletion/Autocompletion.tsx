import { memo, SyntheticEvent, useState } from "react";
import styles from "./Autocompletion.module.scss";
import { Autocomplete, TextField } from "@mui/material";
import { ElementSize, Place } from "../SearchForm";

type Props = {
	value: Place;
	setValue: React.Dispatch<React.SetStateAction<Place>>;
	size?: ElementSize;
};

const Autocompletion = memo(({ value, setValue, size }: Props) => {
	const [inputValue, setInputValue] = useState<string>(value.name);
	const [places, setPlaces] = useState<Place[]>([]);

	const getPlaces = async (input: string): Promise<Place[]> => {
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?proximity=ip&types=place%2Ccountry%2Clocality&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
		);
		const data = await response.json();

		const fetchedPlaces = data.features.map((feature: any) => ({
			name: feature.place_name,
			bbox: feature.bbox,
		}));

		console.log("fetchedData: ");
		console.log(data);

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

	const onChange = (event: SyntheticEvent<Element, Event>, newValue: any) => {
		console.log("onChange: ");
		console.log(newValue);
		if (newValue !== null) {
			setValue(newValue);
		}
	};

	return (
		<Autocomplete
			className={styles.autocomplete}
			inputValue={inputValue}
			onInputChange={onInputChange}
			value={value}
			onChange={onChange}
			options={places}
			getOptionLabel={(option: any) => option.name}
			renderInput={(params) => <TextField {...params} label="Place" />}
			popupIcon={null}
			freeSolo
			blurOnSelect
			selectOnFocus
			size={size}
		/>
	);
});

export default Autocompletion;
