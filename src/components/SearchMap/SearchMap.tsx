import { memo, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./SearchMap.module.scss";
import { Room } from "../../pages/SearchPage";
import { createSearchParams } from "react-router-dom";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? "YOUR_TOKEN";

type Props = {
	rooms: Room[];
	SWLng: number;
	SWLat: number;
	NELng: number;
	NELat: number;
	setSearchParams: any;
};

const SearchMap = memo(({ rooms, SWLng, SWLat, NELng, NELat, setSearchParams }: Props) => {
	const mapContainer = useRef<any>(null);
	const map = useRef<any>(null);

	const createPriceMarker = (price: number) => {
		const priceMarker = document.createElement("span");
		priceMarker.className = styles.priceMarker;
		priceMarker.innerText = "$" + price.toString();
		return priceMarker;
	};

	const updateSearchParamsBbox = (oldParams: URLSearchParams, mapBounds: any): URLSearchParams => {
		const newParams = createSearchParams(oldParams);
		newParams.set("sw_lng", mapBounds._sw.lng);
		newParams.set("sw_lat", mapBounds._sw.lat);
		newParams.set("ne_lng", mapBounds._ne.lng);
		newParams.set("ne_lat", mapBounds._ne.lat);
		newParams.delete("name");
		return newParams;
	};

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

		map.current.on("dragend", () => {
			console.log("dragend");
			const mapBounds = map.current.getBounds();
			console.log(mapBounds._sw.lng);
			setSearchParams((oldParams: URLSearchParams) => updateSearchParamsBbox(oldParams, mapBounds));
		});
	}, []);

	useEffect(() => {
		map.current.fitBounds([
			[SWLng, SWLat],
			[NELng, NELat],
		]);
	}, [SWLng, SWLat, NELng, NELat]);

	useEffect(() => {
		const markers = rooms.map((room) =>
			new mapboxgl.Marker({ element: createPriceMarker(room.price) })
				.setLngLat([room.longitude, room.latitude])
				.addTo(map.current)
		);
		return () => {
			markers.forEach((m) => m.remove());
		};
	}, [rooms]);

	return (
		<div className={styles.searchMap}>
			<div className={styles.mapContainer} ref={mapContainer}></div>
		</div>
	);
});

export default SearchMap;
