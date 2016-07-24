var map;
var markers = new Array(0);
var oaxaca = {lat: 17.063030, lng: -96.723778};
var parkersData, customersData = new Array(0);

/**
 * Draw map on app
 */
function loadMap() {
  	map = new google.maps.Map(document.getElementById('section-map'), {
  		center: oaxaca,
  		mapTypeControl: false,
  		streetViewControl: false,
  		zoom: 15,
  		zoomControlOptions: {
        	position: google.maps.ControlPosition.RIGHT_CENTER
    	},
  		minZoom: 13,
  		maxZoom: 18
	});
}

/**
 * Establish the type marker and number for generator
 * @param  {string} typeMarker Type of marker, can be only "parker" or "customer"
 * @param  {integer} quantity Number of markers to generate
 * @return {boolean} [false] Only when not have parameters
 */
function markerGenerator(typeMarker, quantity){
	if (typeMarker && quantity) {
		switch (typeMarker) {
			case "parker":
				makeRandomMarkers(quantity, "parker");
			break;
			case "customer":
				makeRandomMarkers(quantity, "customer");
			break;
			default:
				return false;
		}
	} else {
		return false;
	}
}

/**
 * Make random marker in bounds of map that the user can see
 * @param  {intenger} quantity Number of markers to generate
 * @param  {string} typeMarker For create array with distinct data and then calculate distances
 */
function makeRandomMarkers(quantity, typeMarker) {
    bounds = map.getBounds();
    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();
    var lon = northEast.lng() - southWest.lng();
    var lat = northEast.lat() - southWest.lat();
    randomMarkers=[];
    markerInfo = {};
    markersRecord = [];

    for( var i = 0 ;i < quantity; ++i ){
    	newLat = southWest.lat() + lat * Math.random();
    	newLon = southWest.lng() + lon * Math.random();
        var newMarker = new google.maps.LatLng(newLat,newLon);
        markerInfo = {
        	'status': 'waiting',
        	'lat_start': newLat,
        	'lon_start': newLon
        };
        markersRecord.push(markerInfo);
        randomMarkers.push(newMarker);
    }

    if (typeMarker === "parker") {
    	parkersData = markersRecord;
    } else if (typeMarker === "customer") {
    	customersData = markersRecord;
    }

    setMap(randomMarkers, typeMarker);
}

/**
 * Set on map all the markers 
 * @param {array} arrayMarkers Array with coordinates
 * @param {type} typeMarker For establish the icon 
 */
function setMap(arrayMarkers, typeMarker){
	for( var i = 0; i < arrayMarkers.length; ++i ) {
        var title = i + " : " + arrayMarkers[i];
        var marker = configMarker(arrayMarkers[i], title, typeMarker);
        markers.push(marker);
        marker.setMap(map);
    }
}

/**
 * Set attributes for each marker
 * @param  {object} coordinates Coordinates for set on the map
 * @param  {string} title Title for the marker
 * @param  {string} typeMarker Establish the icon 
 * @return {object} Object type marker with all properties for set on map
 */
function configMarker(coordinates,title, typeMarker) {
	var icon = (typeMarker === "parker") ? "assets/images/parker.png" : "assets/images/customer.png";
    var marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        icon: icon,
        title: title.toString(),
        draggable: false});
    return marker;
}

/**
 * Reset the data in markers
 */
function resetMarkers(){
	if (markers) {
        for (i in markers) {
            markers[i].setMap(null)
        }
    }
    markers=new Array(0);
}