import { memo, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./SearchMap.module.scss";
import { Room } from "../../pages/SearchPage";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? "YOUR_TOKEN";

type Props = {
	rooms: Room[];
	SWLng: number;
	SWLat: number;
	NELng: number;
	NELat: number;
};

const SearchMap = memo(({ rooms, SWLng, SWLat, NELng, NELat }: Props) => {
	const mapContainer = useRef<any>(null);
	const map = useRef<any>(null);

	useEffect(() => {
		// initialize map only once
		if (map.current) return;

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			// zoom: zoom,
			bounds: [
				[SWLng, SWLat],
				[NELng, NELat],
			],
		});
	}, []);

	return (
		<div className={styles.searchMap}>
			<div className={styles.mapContainer} ref={mapContainer}></div>
		</div>
	);
});

export default SearchMap;
