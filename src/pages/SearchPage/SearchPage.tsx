import React, { memo, useEffect, useState } from "react";
import styles from "./SearchPage.module.scss";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import RoomCard from "../../components/RoomCard";
import SearchMap from "../../components/SearchMap";
import { Backdrop, Button, Chip } from "@mui/material";
import { FormatListBulletedOutlined, MapOutlined } from "@mui/icons-material";
import SearchForm from "../../components/SearchForm";
import dayjs from "dayjs";

export type Media = {
	id: number;
	filename: string;
};

export type Room = {
	id: number;
	description: string;
	price: number;
	latitude: number;
	longitude: number;
	media: Media[];
};

export type BoundingBox = {
	SWLng: number;
	SWLat: number;
	NELng: number;
	NELat: number;
};

const SearchPage = memo(() => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [rooms, setRooms] = useState<Room[]>([]);
	const [toggle, setToggle] = useState<boolean>(false);
	const [showSearchForm, setShowSearchForm] = useState<boolean>(false);

	const bbox: BoundingBox = {
		SWLng: Number(searchParams.get("sw_lng") || -179.9),
		SWLat: Number(searchParams.get("sw_lat") || 18.8),
		NELng: Number(searchParams.get("ne_lng") || -66.9),
		NELat: Number(searchParams.get("ne_lat") || 71.4),
	};

	const guests = {
		adults: Number(searchParams.get("adults") || 0),
		children: Number(searchParams.get("children") || 0),
		pets: Number(searchParams.get("pets") || 0),
	};

	const getRooms = async (params: URLSearchParams) => {
		const response = await fetch(`${process.env.REACT_APP_ROOMS_URI}/?${params}`);
		const rooms = await response.json();
		return rooms;
	};

	useEffect(() => {
		console.log("SearchPage mount");
		const apiParams = new URLSearchParams(searchParams);
		apiParams.delete("name");
		console.log(`${process.env.REACT_APP_ROOMS_URI}/?${apiParams.toString()}`);
		getRooms(searchParams).then((rooms) => {
			console.log(rooms);
			setRooms(rooms);
		});
	}, [searchParams]);

	const Search = (
		<SearchForm
			name={searchParams.get("name") || ""}
			SWLng={bbox.SWLng}
			SWLat={bbox.SWLat}
			NELng={bbox.NELng}
			NELat={bbox.NELat}
			checkin={searchParams.get("checkin")}
			checkout={searchParams.get("checkout")}
			adults={Number(searchParams.get("adults")) || 0}
			children={Number(searchParams.get("children")) || 0}
			pets={Number(searchParams.get("pets")) || 0}
			style={{ flexDirection: "column", alignItems: "center", minWidth: 0 }}
		/>
	);

	const List = (
		<div className={styles.roomList}>
			{rooms.length > 0 && rooms.map((room, index) => <RoomCard room={room} key={index} />)}
		</div>
	);

	const Map = (
		<div className={styles.mapWrapper}>
			<SearchMap
				rooms={rooms}
				SWLng={bbox.SWLng}
				SWLat={bbox.SWLat}
				NELng={bbox.NELng}
				NELat={bbox.NELat}
				setSearchParams={setSearchParams}
			/>
		</div>
	);

	return (
		<div className={styles.searchPage}>
			<Header>
				<React.Fragment>
					{window.innerWidth > 920 ? (
						Search
					) : (
						<Chip
							label={
								`${searchParams.get("name")?.slice(0, 6) || "area"} ` +
								`| ${dayjs(searchParams.get("checkin")).date()}-${dayjs(searchParams.get("checkout")).date()} ` +
								`| ${guests.adults + guests.children} guests`
							}
							onClick={() => setShowSearchForm((prev) => !prev)}
							variant="outlined"
							className={styles.searchFormStatus}
						/>
					)}

					<Backdrop open={showSearchForm} onClick={() => setShowSearchForm((prev) => !prev)}>
						<div className={styles.searchFormWrapper} onClick={(e) => e.stopPropagation()}>
							{Search}
						</div>
					</Backdrop>
				</React.Fragment>
			</Header>
			{window.innerWidth > 920 ? List : toggle ? null : List}
			{window.innerWidth > 920 ? Map : toggle ? Map : null}
			<Button
				className={styles.toggle}
				onClick={() => setToggle((prevState) => !prevState)}
				variant="contained"
				sx={{
					position: "fixed",
					bottom: "1.5rem",
					left: "50%",
					height: "2.8rem",
					width: "6rem",
					transform: "translate(-50%)",
					zIndex: 10,
					fontSize: "1rem",
					textTransform: "none",
					borderRadius: "20px",
				}}
			>
				{toggle ? (
					<span className={styles.toggle__content}>
						List <FormatListBulletedOutlined />
					</span>
				) : (
					<span className={styles.toggle__content}>
						Map <MapOutlined />
					</span>
				)}
			</Button>
		</div>
	);
});

export default SearchPage;
