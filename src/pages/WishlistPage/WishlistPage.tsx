import { useEffect, useState } from "react";
import styles from "./WishlistPage.module.scss";
import { Room } from "../SearchPage";
import Header from "../../components/Header/Header";
import RoomCard from "../../components/RoomCard";

const WishlistPage = () => {
	const [rooms, setRooms] = useState<Room[]>([]);

	const getWishedRooms = async () => {
		const response = await fetch(`${process.env.REACT_APP_API}/rooms/favorite`);

		if (response.ok) {
			const rooms: Room[] = await response.json();
			setRooms(rooms);
		}
	};

	useEffect(() => {
		getWishedRooms();
	}, []);

	return (
		<div className={styles.wishlistPage}>
			<Header />
			<div className={styles.wishlistPage__container}>
				<div className={styles.roomList}>
					{rooms.length > 0 && rooms.map((room, index) => <RoomCard room={room} key={index} />)}
				</div>
			</div>
		</div>
	);
};

export default WishlistPage;
