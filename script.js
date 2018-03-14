const degCelsius = "&#8451;";
const degFahrenheit = "&#8457;";
let celsius = true;
let temp = null;

$(document).ready(function() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  function showPosition(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeather(latitude, longitude);
  }

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occured.");
        break;
    }
  }

  function getWeather(lat, lon) {
    $.getJSON(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`, function(weather) {
      console.log(weather);
      const place = weather.name;
      temp = weather.main.temp;
      const main = weather.weather[0].main;
      const icon = weather.weather[0].icon;
      showWeather(place, temp, main, icon);
    });
  }

  function showWeather(place, temp, main, icon) {
    $(".place").html(place);
    $(".degrees-number").html(temp);
    $(".degrees-symbol").html(degCelsius);
    $(".main").html(main);

    if (icon) {
      const img = $('<img class="icon">');
      img.attr("src", icon);
      img.attr("att", "Weather Icon");
      img.appendTo(".weather-container");
    }
  }

  function convert(degree) {
    if (celsius) {
      degree = Math.round(degree * 9 / 5 + 32);
    } else {
      degree = Math.round((degree - 32) * 5 / 9);
    }
    return degree;
  }

  $(".degrees-symbol").on('click', function() {
    temp = convert(temp);
    let newSymbol = celsius ? degFahrenheit : degCelsius;

    $(".degrees-number").html(temp);
    $(".degrees-symbol").html(newSymbol);

    celsius = !celsius;

  });
});
