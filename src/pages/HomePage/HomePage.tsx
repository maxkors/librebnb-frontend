import { memo } from "react";
import Header from "../../components/Header";
import SearchForm from "../../components/SearchForm";
import styles from "./HomePage.module.scss";

const HomePage = memo(() => {
	return (
		<div className={styles.homePage}>
			<Header />
			<SearchForm
				name=""
				SWLng={0}
				SWLat={0}
				NELng={0}
				NELat={0}
				checkin={null}
				checkout={null}
				adults={0}
				children={0}
				pets={0}
			/>
		</div>
	);
});

export default HomePage;
