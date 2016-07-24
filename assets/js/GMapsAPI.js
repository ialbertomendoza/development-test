var map;
var markers = new Array(0);
var oaxaca = {lat: 17.063030, lng: -96.723778};

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
    console.log(markersRecord);

    setMap(randomMarkers, typeMarker);
}

function setMap(arrayMarkers, typeMarker){
	for( var i = 0; i < arrayMarkers.length; ++i ) {
        var title = i + " : " + arrayMarkers[i];
        var marker = configMarker(arrayMarkers[i], title, typeMarker);
        markers.push(marker);
        marker.setMap(map);
    }
}

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

function resetMarkers(){
	if (markers) {
        for (i in markers) {
            markers[i].setMap(null)
        }
    }
    markers=new Array(0);
}