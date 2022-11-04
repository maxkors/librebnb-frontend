import { memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

type Props = {
	searchForm?: any;
	searchFormStatus?: any;
	show?: boolean;
};

const Header = memo(({ searchForm, searchFormStatus, show }: Props) => {
	return (
		<div className={styles.header}>
			<Link to="/" className={styles.logo}>
				Librebnb
			</Link>
			{searchFormStatus}
			{show && searchForm}
		</div>
	);
});

export default Header;
