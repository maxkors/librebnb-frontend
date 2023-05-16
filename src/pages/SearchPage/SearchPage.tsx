import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import styles from "./SearchPage.module.scss";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import RoomCard from "../../components/RoomCard";
import SearchMap from "../../components/SearchMap";
import { Backdrop, Button, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { FormatListBulletedOutlined, MapOutlined, TuneOutlined } from "@mui/icons-material";
import SearchForm from "../../components/SearchForm";
import dayjs from "dayjs";
import SearchFormStatus from "../../components/SearchFormStatus";
import { useDispatch } from "react-redux";
import { setIsLogInPopupOpen } from "../../store/slices/popupSlice";

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
	isLiked: boolean;
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
	const [rooms, setRooms] = useState<Room[] | any>([]);
	const [toggle, setToggle] = useState<boolean>(false);
	const [showSearchForm, setShowSearchForm] = useState<boolean>(false);
	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [width] = useWindowSize();
	const dispatch = useDispatch();

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
		const response = await fetch(`${process.env.REACT_APP_API}/rooms?${params}`);
		const rooms = await response.json();
		return rooms;
	};

	const onLikeButtonClick = async (roomId: number, isRoomLiked: boolean) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/rooms/${roomId}/like`, {
				method: isRoomLiked ? "DELETE" : "POST",
			});

			if (response.status === 401) {
				dispatch(setIsLogInPopupOpen(true));
			}

			setRooms((prevState: Room[]) =>
				prevState.map((r) => {
					if (r.id === roomId) {
						r.isLiked = !r.isLiked;
					}

					return r;
				})
			);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		console.log("SearchPage mount");
		const apiParams = new URLSearchParams(searchParams);
		apiParams.delete("name");
		console.log(`${process.env.REACT_APP_API}?${apiParams.toString()}`);
		getRooms(searchParams).then((rooms) => {
			console.log(rooms);
			setRooms(rooms);
		});
	}, [searchParams]);

	const Search = (
		<SearchForm
			formSize="small"
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
			{rooms.length > 0 &&
				rooms.map((room: Room, index: number) => (
					<RoomCard room={room} onLikeButtonClick={onLikeButtonClick} key={index} />
				))}
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
					{width > 920 ? (
						Search
					) : (
						<SearchFormStatus
							name={`${searchParams.get("name")?.slice(0, 6) || "area"}`}
							dates={`${dayjs(searchParams.get("checkin")).date()}-${dayjs(searchParams.get("checkout")).date()}`}
							guests={`${guests.adults + guests.children}`}
							setShowSearchForm={setShowSearchForm}
						/>
					)}

					<Backdrop open={showSearchForm} onClick={() => setShowSearchForm((prev) => !prev)}>
						<div className={styles.searchFormWrapper} onClick={(e) => e.stopPropagation()}>
							{Search}
						</div>
					</Backdrop>

					<IconButton
						className={styles.filtersButton_mobile}
						onClick={() => setShowFilters((prev) => !prev)}
						sx={{ width: "2.5rem", height: "2.5rem", marginLeft: "auto", border: "1px solid #bbbbbb" }}
					>
						<TuneOutlined />
					</IconButton>

					<Button
						className={styles.filtersButton_desktop}
						onClick={() => setShowFilters((prev) => !prev)}
						variant="outlined"
						sx={{
							marginLeft: "1rem",
							textTransform: "initial",
							fontSize: "1rem",
							height: "2.5rem",
							borderRadius: "20px",
						}}
						startIcon={<TuneOutlined />}
					>
						Filters
					</Button>

					<Backdrop open={showFilters} onClick={() => setShowFilters((prev) => !prev)}>
						<div className={styles.filtersWrapper} onClick={(e) => e.stopPropagation()}>
							<h5 style={{ borderBottom: "1px solid #bbbbbb", textAlign: "center", padding: "1rem 0" }}>Filters</h5>
							<div style={{ padding: "1rem 1.5rem" }}>
								<h5 style={{ borderBottom: "1px solid #bbbbbb", padding: "0.5rem" }}>Amenities</h5>
								<ul>
									<li>
										<FormControlLabel control={<Checkbox />} label="Wifi" />
									</li>
									<li>
										<FormControlLabel control={<Checkbox />} label="TV" />
									</li>
									<li>
										<FormControlLabel control={<Checkbox />} label="Kitchen" />
									</li>
									<li>
										<FormControlLabel control={<Checkbox />} label="Washer" />
									</li>
									<li>
										<FormControlLabel control={<Checkbox />} label="Dryer" />
									</li>
								</ul>
							</div>
						</div>
					</Backdrop>
				</React.Fragment>
			</Header>

			{width > 920 ? List : toggle ? null : List}
			{width > 920 ? Map : toggle ? Map : null}

			<Button
				className={styles.toggle}
				onClick={() => setToggle((prevState) => !prevState)}
				variant="contained"
				sx={{
					position: "fixed",
					bottom: "5rem",
					left: "50%",
					height: "2.5rem",
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

function useWindowSize() {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return size;
}

export default SearchPage;
