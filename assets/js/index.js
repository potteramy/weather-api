var button = $("#submit-button");
var cityName;
var todayWeather = $(".todayWeather");
var fiveDay = $(".fiveDay");
var searches = $('.searches')
var cityHistory;
var apiKey = "70ddba253090d64cb533d825e655e603"

function getHistory() {
  cityHistory = JSON.parse(localStorage.getItem("cities"));
  if (cityHistory === null) {
    cityHistory = [];
  }
  historyButtons()
}

function historyButtons() {
  searches.html('')
  for(var i = 0; i < cityHistory.length; i++) {
    let name = cityHistory[i]
    let button = $('<button class="btn btn-primary">')
    button.text(name)
    searches.append(button)
    button.on('click', function(e) {
      event.preventDefault();
      getWeather(name);
    })
  }
}

// button.on('click', searchCity())

//List previously searched cities

function historySearch(event) {
  cityName = event.target.textContent;
}

function getWeather(cityName) {
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey+"&units=imperial")
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      var fiveDayHtml = ''; 
      for(var i = 0; i < data.list.length; i+=8) {
       
        fiveDayHtml += `<div class='card'><img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"><p>Temperature: ${data.list[i].main.temp} degrees F </p>
        <p>Humidity: ${data.list[i].main.humidity}%</p>
        <p>Wind Speed: ${data.list[i].wind.speed}mph</p></div>
        `;
      }
      fiveDay.html(`<h2>Five Day:</h2>${fiveDayHtml}`);
    });
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid="+ apiKey + "&units=imperial")
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      todayWeather.html(`<h2>${
        data.name
      } (${dayjs.unix(data.dt).format("MM/DD/YYYY")}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></h2>
    <p>Temperature: ${data.main.temp} degrees F </p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed}mph</p>`);
    })
    
}

// function displayWeather(weatherData) {
//   let city = data.city.name;
//   console.log(weatherData);
// }

button.on("click", function (event) {
  event.preventDefault();
  var cityName = $('#search-bar').val()
  if (!cityHistory.includes(cityName)) {
    cityHistory.push(cityName)
    localStorage.setItem('cities', JSON.stringify(cityHistory))
    historyButtons()
  }
  getWeather(cityName);
});
getHistory();