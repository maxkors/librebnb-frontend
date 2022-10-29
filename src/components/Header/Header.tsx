import { memo } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = memo(() => {
	return (
		<div className={styles.header}>
			<Link to="/" className={styles.logo}>Librebnb</Link>
		</div>
	);
});

export default Header;
