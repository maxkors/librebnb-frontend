import { memo } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationMobile.module.scss";
import {
	SearchOutlined,
	FavoriteBorderOutlined,
	ChatBubbleOutlineOutlined,
	AccountCircleOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setIsLogInPopupOpen } from "../../store/slices/popupSlice";

const NavigationMobile = memo(() => {
	const username = useSelector((state: RootState) => state.profile.username);
	const isLoggedIn = useSelector((state: RootState) => state.profile.isLoggedIn);
	const dispatch = useDispatch();

	const onSignOutProfileClick = () => {
		dispatch(setIsLogInPopupOpen(true));
	};

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
					{isLoggedIn ? (
						<NavLink to="/profile" className={styles.navLink}>
							<AccountCircleOutlined className={styles.icon} />
							{username}
						</NavLink>
					) : (
						<div className={styles.navLink} onClick={onSignOutProfileClick}>
							<AccountCircleOutlined className={styles.icon} />
							{username}
						</div>
					)}
				</li>
			</ul>
		</nav>
	);
});

export default NavigationMobile;
