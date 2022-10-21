import Header from "../../components/Header";
import SearchForm from "../../components/SearchForm";
import styles from "./HomePage.module.scss";

const HomePage = () => {
	return (
		<div className={styles.homePage}>
			<Header />
			<SearchForm />
		</div>
	);
};

export default HomePage;
