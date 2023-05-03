import { useEffect, useState } from "react";
import styles from "./ProfilePage.module.scss";
import Header from "../../components/Header";
import { clearProfile } from "../../store/slices/profileSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

type Profile = {
	username: string;
	email: string;
	phone_number: string;
};

const ProfilePage = () => {
	const [profileDetails, setProfileDetails] = useState<Profile>({ username: "", email: "", phone_number: "" });
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const getProfileDetails = async () => {
		const response = await fetch(`${process.env.REACT_APP_API}/profile`);

		if (response.ok) {
			const profile: Profile = await response.json();
			setProfileDetails(profile);
		}
	};

	const logOutOnClick = async () => {
		try {
			// const response = await fetch("http://localhost:8080/api/logout", {
			const response = await fetch(`${process.env.REACT_APP_API}/logout`, {
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
				credentials: "include",
			});

			if (response.status === 401) {
				dispatch(clearProfile());
				navigate("/");
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getProfileDetails();
	}, []);

	return (
		<div className={styles.profilePage}>
			<Header />
			<div className={styles.profilePage__container}>
				<h2 className={styles.header}>Profile:</h2>
				<p className={styles.line}>
					<span className={styles.line__name}>Username:</span>{" "}
					<span className={styles.line__data}>{profileDetails.username}</span>
				</p>
				<p className={styles.line}>
					<span className={styles.line__name}>Email:</span>{" "}
					<span className={styles.line__data}>{profileDetails.email}</span>
				</p>
				<p className={styles.line}>
					<span className={styles.line__name}>Phone number:</span>{" "}
					<span className={styles.line__data}>{profileDetails.phone_number}</span>
				</p>
				<Button
					className={styles.logOutButton}
					variant="contained"
					onClick={logOutOnClick}
					sx={{
						fontSize: "1.1rem",
						textTransform: "none",
						fontWeight: "bold",
						color: "white",
						height: "2.5rem",
						marginTop: "2rem",
					}}
				>
					<span>Log out</span>
				</Button>
			</div>
		</div>
	);
};

export default ProfilePage;
