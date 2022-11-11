import { memo, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "./logo.png";

type Props = {
	children?: ReactNode;
};

const Header = memo(({ children }: Props) => {
	return (
		<div className={styles.header}>
			<Link to="/" className={styles.logo}>
				<img src={logo} alt="Librebnb" className={styles.logo__image} />
				<p className={styles.logo__text}>Librebnb</p>
			</Link>
			{children}
		</div>
	);
});

export default Header;
