var button = $("#submit-button");
var cityName
var todayWeather = document.getElementsByClassName("todayWeather")
cityHistory = JSON.parse(localStorage.getItem("cities"));

if (cityHistory === null) {
  cityHistory = [];
}
// button.on('click', searchCity())
button.on("click", function (event) {
  event.preventDefault();
  searchCity();
});




//List previously searched cities

function historySearch(event) {
  cityName = event.target.textContent;
}


function getWeather(cityName) {
fetch(
  'api.openweathermap.org/data/2.5/forecast?q='+ cityName +'&appid=70ddba253090d64cb533d825e655e603'
  )
.then((response) => response.json())
.then(function (data) {
  console.log(data);
  startWeather();
})
fetch('api.openweathermap.org/data/2.5/weather?q='+ cityName +'&appid=70ddba253090d64cb533d825e655e603')
  .then(function (response) {
    return response.json()
  })
  .then(function (data){
    console.log(data);
    todayWeather.html(`<h2>${data.name} (${day.js.unix(data.dt).format('MM/DD/YYYY')}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></h2>
    <p>Temperature: ${data.main.temp} degrees F </p>
    <p>Humidity:${data.main.humidity}</p>
    <p>Wind Speed:${data.wind.speed}</p>`)
  })
}
    


  function displayWeather(weatherData) {
  let city = data.city.name;
  console.log(weatherData);
  }
getWeather();