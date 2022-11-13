import styles from "./RoomCard.module.scss";
import ImageGallery from "react-image-gallery";
import { memo } from "react";
import { Media, Room } from "../../pages/SearchPage";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

type Props = {
	room: Room;
};

const RoomCard = memo(({ room }: Props) => (
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
		<FavoriteOutlinedIcon
			className={styles.like}
			sx={{ position: "absolute", color: "white", right: "10px", top: "10px", fontSize: "1.8rem" }}
		/>
	</div>
));

export default RoomCard;
