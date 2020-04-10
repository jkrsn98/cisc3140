const words = new URLSearchParams(window.location.search);
var loc = words.get('location'), cords;
var currentUnixTime = Math.round(Date.now() / 1000), targetDate = new Date();
var timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60;
var localDate, offsets;
var formattedAd;
var day, temp, rain, windy, cloudy;
//var caploc = loc.toLowerCase();
//console.log(caploc);
window.onload = function(){
  document.getElementById('locationName').innerHTML = loc; //'formattedAd' to display formal location;
  document.getElementsByClassName("content")[0].innerHTML = temp;
  displayLogic();
};

function displayLogic(){
  if(day && !cloudy){
    cloudy?setBackgroundImage('background-overcast.jpg'):setBackgroundImage('background-day.jpg');
    setWeatherBoxOpacity('45%');
    setWeatherBoxBackground('day.gif');
    if(windy){
      if(temp<60){
        setMessage("Grab a jacket.");
        setWeatherBoxBackground('windy-day2.gif');
      }else{
        setMessage("It's wonderful out.");
        setWeatherBoxBackground('windy-nice.gif');
      }
    }else{
      (temp>65)?setMessage("It's wonderful out."):setMessage("Enjoy your day.");
    }
  }

  if(day && cloudy){
    setBackgroundImage('background-overcast.jpg');
    setWeatherBoxOpacity('40%');
    if (rain){
      setMessage("Take an umbrella.");
      setWeatherBoxBackground('rain-day.gif');
    }
    else if(windy){
      setWeatherBoxBackground('windy-cold.gif');
    }else
      setMessage("Enjoy your day.");
  }

  if(!day){
    setBackgroundImage('background-night.jpg');
    setWeatherBoxOpacity('15%');
    setMessage("Have a good night.");
    if(rain){
      setWeatherBoxBackground('rain-night.gif');
    }
    else if(windy){
      setWeatherBoxBackground('windy-overcast.gif');
    }else{
      //setWeatherBoxBackground('moon4.gif');
    }
  }
}

function setBackgroundImage(s){
  console.log("setting background to " + s);
  s = "imgs/"+s;
  document.getElementById("weatherBody").style.backgroundImage= "url("+'\''+s+'\''+")";
}

function setWeatherBoxOpacity(s){
  console.log("setting weatherbox opacity to " + s);
  document.getElementsByClassName("weatherBox")[0].style.opacity= s;
}

function setWeatherBoxBackground(s){
  console.log("setting weatherbox background to " + s);
  s = "imgs/"+s;
  document.getElementsByClassName("weatherBox")[0].style.backgroundImage= "url("+'\''+s+'\''+")";
}

function setMessage(s){
  document.getElementsByClassName("msg")[0].innerHTML = s;
}

//------------------------------------------------------------------------------

//Gets coordinates from user inputted location
var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + loc +
 "&key=AIzaSyBICDS3opgWm-qTJPBthMe0DU4gX58pJCE";

$.ajax({
  async:false,
  url: googleURL,
  success: function(data){
    console.log(data);
    cords = data.results[0].geometry.location.lat+","+data.results[0].geometry.location.lng;
    formattedAd = data.results[0].formatted_address;
  }
});

//Gets local user time
var googleURL2 ="https://maps.googleapis.com/maps/api/timezone/json?location="+
 cords + "&timestamp=" + currentUnixTime +
  "&key=AIzaSyBICDS3opgWm-qTJPBthMe0DU4gX58pJCE";

$.ajax({
  async:false,
  url: googleURL2,
  success: function(data){
    console.log(data);
    offsets = data.dstOffset*1000+data.rawOffset*1000;
    localDate = new Date(timestamp * 1000 + offsets);
    day = (localDate.getHours() > 6 && localDate.getHours() < 20)?true:false;
    console.log("is day?" + day);
  }
});
console.log("local date : " + localDate);
console.log(cords);

//Gets weather data. Requires a proxy for some reason (herokuapp)...
var darkSkyURL =
"https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0640ebe06d6b9791120ae72443eef475/" +
 cords + ","+ currentUnixTime + "?exclude=minutely,hourly,daily,alerts,flags";

$.ajax({
  async:false,
  url: darkSkyURL,
  success: function(data){
    console.log(data);
    temp= Math.floor(data.currently.temperature);
    windy = Math.floor(data.currently.windSpeed)>9?true:false;
    rain = (data.currently.precipProbability)>.5?true:false;
    cloudy = (data.currently.cloudCover)>.45?true:false;
    console.log("windy?" + windy);
    console.log("cloudy?" + cloudy);
    console.log("rain: " + rain);
    console.log("temp: " + temp);
  }
});
