import { memo, useEffect, useState } from "react";
import styles from "./SearchPage.module.scss";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header";
import ImageGallery from "react-image-gallery";

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
		const apiParams = new URLSearchParams(searchParams);
		apiParams.delete("name");
		console.log(`${process.env.REACT_APP_ROOMS_URI}/?${apiParams.toString()}`);
		getRooms(searchParams).then((rooms) => {
			console.log(rooms);
			setRooms(rooms);
		});
	}, []);

	return (
		<div className={styles.searchPage}>
			<Header />
			<div className={styles.roomList}>
				{rooms.length > 0 &&
					rooms.map((room, index) => (
						<div className={styles.room}>
							<ImageGallery
								key={index}
								items={room.media.map((media) => ({
									original: "images/" + media.filename,
									loading: "lazy",
								}))}
								showPlayButton={false}
								showFullscreenButton={false}
								showBullets={true}
								lazyLoad={true}
							/>
						</div>
					))}
			</div>
		</div>
	);
});

export default SearchPage;
