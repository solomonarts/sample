/*global google*/

const arePointsNear = (checkPoint, centerPoint) => {
  //   var sw = new google.maps.LatLng(
  //     centerPoint.lat - 0.005,
  //     centerPoint.lng - 0.005
  //   );
  //   var ne = new google.maps.LatLng(
  //     centerPoint.lat + 0.005,
  //     centerPoint.lng + 0.005
  //   );
  //   var bounds = new google.maps.LatLngBounds(sw, ne);
  //   if (bounds.contains(checkPoint)) {
  //     return true;
  //   }
  //   return false;

  var lt = centerPoint.lat;
  var lt1 = checkPoint.lat;
  var ln = centerPoint.lng;
  var ln1 = checkPoint.lng;
  var dLat = ((lt - lt1) * Math.PI) / 180;
  var dLon = ((ln - ln1) * Math.PI) / 180;
  var a =
    0.5 -
    Math.cos(dLat) / 2 +
    (Math.cos((lt1 * Math.PI) / 180) *
      Math.cos((lt * Math.PI) / 180) *
      (1 - Math.cos(dLon))) /
      2;
  var d = Math.round(6371000 * 2 * Math.asin(Math.sqrt(a)));

  return d / 1000;
};

export default arePointsNear;
