import styles from "./RoomCard.module.scss";
import ImageGallery from "react-image-gallery";
import { memo } from "react";
import { Media, Room } from "../../pages/SearchPage";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {
	room: Room;
	onLikeButtonClick: (roomId: number, isRoomLiked: boolean) => void;
};

const RoomCard = memo(({ room, onLikeButtonClick }: Props) => {
	// kakogo huya RoomCard delaet zaprosy, a ne parent component (tam i otrobatyvat doljno po-raznomy)
	// room ne doljna ydalatsia iz  Seach page, tolko ybrat like
	// find by indexOf and change value and return mutated
	// MAP delaet shallow copy, poetomy error pri chtenii MEDIA

	return (
		<div className={styles.roomCard}>
			<div className={styles.gallery}>
				<ImageGallery
					items={room.media.map((media: Media) => ({
						original: "images/" + media.filename,
						loading: "lazy",
					}))}
					showPlayButton={false}
					showFullscreenButton={false}
					showBullets={true}
					lazyLoad={true}
				/>
			</div>
			<div className={styles.info}>
				<p className={styles.description}>{room.description}</p>
				<p className={styles.price}>${room.price} night</p>
			</div>

			{room.isLiked ? (
				<FavoriteIcon
					onClick={() => onLikeButtonClick(room.id, room.isLiked)}
					className={styles.like}
					sx={{ position: "absolute", color: "red", right: "10px", top: "10px", fontSize: "1.8rem" }}
				/>
			) : (
				<FavoriteOutlinedIcon
					onClick={() => onLikeButtonClick(room.id, room.isLiked)}
					className={styles.like}
					sx={{ position: "absolute", color: "white", right: "10px", top: "10px", fontSize: "1.8rem" }}
				/>
			)}
		</div>
	);
});

export default RoomCard;
