import { memo } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MenuMobile.module.scss";
import {
	SearchOutlined,
	FavoriteBorderOutlined,
	ChatBubbleOutlineOutlined,
	AccountCircleOutlined,
} from "@mui/icons-material";

const MenuMobile = memo(() => {
	return (
		<nav className={styles.menuMobile}>
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
						Profile
					</NavLink>
				</li>
			</ul>
		</nav>
	);
});

export default MenuMobile;
