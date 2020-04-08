const words = new URLSearchParams(window.location.search);

loc = words.get('location');
var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address= " + loc + "&key=AIzaSyBICDS3opgWm-qTJPBthMe0DU4gX58pJCE";
var cords;
var formattedAd;
var caploc = loc.toLowerCase();
console.log(caploc);
window.onload = function(){
  document.getElementById('locationName').innerHTML = formattedAd;
};

$.ajax({
  async:false,
  url: googleURL,
  success: function(data){
    cords = data.results[0].geometry.location.lat+","+data.results[0].geometry.location.lng;
    formattedAd = data.results[0].formatted_address;
  }
});

console.log(cords);

var currentUnixTime = Math.round(Date.now() / 1000);
console.log(currentUnixTime);
var darkSkyURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0640ebe06d6b9791120ae72443eef475/" + cords + ","+ currentUnixTime + "?exclude=minutely,hourly,daily,alerts,flags";

$.getJSON(darkSkyURL, function(data){
  console.log(data);
  var temp= Math.floor(data.currently.temperature);
  $('.content').append(temp);
});
