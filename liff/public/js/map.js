function load_map() {
	var map = new mxn.Mapstraction('place-map', 'leaflet'),
		mapElement = document.getElementById('place-map'),
		lat = mapElement.getAttribute('data-lat'),
		lng = mapElement.getAttribute('data-lng'),
		latlon = new mxn.LatLonPoint(lat, lng);

	map.setCenterAndZoom(latlon, 13);
	map.addSmallControls();
}