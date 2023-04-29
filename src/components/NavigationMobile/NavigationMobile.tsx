import { memo } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationMobile.module.scss";
import {
	SearchOutlined,
	FavoriteBorderOutlined,
	ChatBubbleOutlineOutlined,
	AccountCircleOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const NavigationMobile = memo(() => {
	const username = useSelector((state: RootState) => state.profileReducer.username);

	return (
		<nav className={styles.navigationMobile}>
			<ul className={styles.list}>
				<li className={styles.listItem}>
					<NavLink to="/" className={styles.navLink}>
						<SearchOutlined className={styles.icon} />
						Explore
					</NavLink>
				</li>
				<li className={styles.listItem}>
					<NavLink to="/" className={styles.navLink}>
						<FavoriteBorderOutlined className={styles.icon} />
						Wishlist
					</NavLink>
				</li>
				<li className={styles.listItem}>
					<NavLink to="/" className={styles.navLink}>
						<ChatBubbleOutlineOutlined className={styles.icon} />
						Inbox
					</NavLink>
				</li>
				<li className={styles.listItem}>
					<NavLink to="/" className={styles.navLink}>
						<AccountCircleOutlined className={styles.icon} />
						{username}
					</NavLink>
				</li>
			</ul>
		</nav>
	);
});

export default NavigationMobile;
