import { memo } from "react";
import styles from "./Header.module.scss";

const Header = memo(() => {
	return <p className={styles.header}>Librebnb</p>;
});

export default Header;
