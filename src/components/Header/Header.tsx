import { memo, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

type Props = {
	children?: ReactNode;
};

const Header = memo(({ children }: Props) => {
	return (
		<div className={styles.header}>
			<Link to="/" className={styles.logo}>
				Librebnb
			</Link>
			{children}
		</div>
	);
});

export default Header;
