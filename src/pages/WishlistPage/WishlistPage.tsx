import { useEffect, useState } from "react";
import styles from "./WishlistPage.module.scss";
import { Room } from "../SearchPage";
import Header from "../../components/Header/Header";
import RoomCard from "../../components/RoomCard";
import { useDispatch } from "react-redux";
import { setIsLogInPopupOpen } from "../../store/slices/popupSlice";

const WishlistPage = () => {
	const [rooms, setRooms] = useState<Room[] | any>([]);
	const dispatch = useDispatch();

	const getWishedRooms = async () => {
		const response = await fetch(`${process.env.REACT_APP_API}/rooms/favorite`);

		if (response.ok) {
			const rooms: Room[] = await response.json();
			setRooms(rooms);
		}
	};

	const onLikeButtonClick = async (roomId: number, isRoomLiked: boolean) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/rooms/${roomId}/like`, {
				method: isRoomLiked ? "DELETE" : "POST",
			});

			if (response.status === 401) {
				dispatch(setIsLogInPopupOpen(true));
			}

			setRooms((prevState: Room[]) => {
				if (isRoomLiked) {
					return prevState.filter((r) => r.id !== roomId);
				}
			});
		} catch (e) {
			console.log(e);
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
					{rooms.length > 0 &&
						rooms.map((room: Room, index: number) => (
							<RoomCard room={room} onLikeButtonClick={onLikeButtonClick} key={index} />
						))}
				</div>
			</div>
		</div>
	);
};

export default WishlistPage;
