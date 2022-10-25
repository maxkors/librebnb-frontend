import { memo, useEffect, useState } from "react";
import styles from "./SearchPage.module.scss";
import { useSearchParams } from "react-router-dom";

export type Room = {
	id: number;
	description: string;
	price: number;
	latitude: number;
	longitude: number;
};

const SearchPage = memo(() => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [rooms, setRooms] = useState<Room[]>([]);

	const searchParamsToMap = (params: URLSearchParams) => {
		const searchParamsMap: any = {};

		params.forEach((value, key) => {
			searchParamsMap[key] = value;
		});

		return searchParamsMap;
	};

	const getRooms = async (params: URLSearchParams) => {
		const response = await fetch(`${process.env.REACT_APP_ROOMS_URI}/?${params}`);
		const rooms = await response.json();
		return rooms;
	};

	useEffect(() => {
		console.log("SearchPage mount");
    // console.log(searchParams.toString());
		const apiParams = new URLSearchParams(searchParams);
    apiParams.delete("name");
		console.log(`${process.env.REACT_APP_ROOMS_URI}/?${apiParams.toString()}`);
		// console.log(searchParamsToMap(searchParams));
		getRooms(searchParams).then((rooms) => setRooms(rooms));
	}, []);

	return (
		<div>
			<p>SearchPage</p>
			<pre>{JSON.stringify(rooms, undefined, 2)}</pre>
		</div>
	);
});

export default SearchPage;
