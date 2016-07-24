var map;
function loadMap() {
  map = new google.maps.Map(document.getElementById('section-map'), {
    center: {lat: 17.063030, lng: -96.723778},
    zoom: 14
  });
}