var muscle = "biceps";
fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
  method: "GET",
  headers: { "X-Api-Key": "JTo+3b4INS07H1+MuR5ygw==xgXVzkHdaEOHWO1Y" },
  contentType: "application/json",
}).then(function (response) {
  if (!response.ok) {
    return response.json();
  }
  response.json().then(function (data) {
    console.log(data);
  });
});

function generateForecastCards() {
  let cityName = "Madison";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=acbf659b6dad995f4221a78b638e6923`;
  fetch(weatherUrl).then(function (response) {
    if (!response.ok) {
      return response.json();
    }
    response.json().then(function (data) {
      console.log(data);
      let fiveDayData = [];
      console.log(fiveDayData);
      data.list.forEach((element) => {
        let queryTime = data.list[0].dt_txt;
        let currentHour = new Date(queryTime).getHours();
        let elementDate = new Date(element.dt_txt).getHours();

        if (elementDate === currentHour) {
          fiveDayData.push(element);
        }
      });

      // Generate 5 Day Forecast Cards
      for (let i = 0; i < fiveDayData.length; i++) {
        let temp = `Temp: ${fiveDayData[i].main.temp.toFixed(2)}°F`;
        //
        let wind = `Wind: ${fiveDayData[i].wind.speed}mph`;
        //
        let humidity = `Humidity: ${fiveDayData[i].main.humidity}%`;
        //
        let date = fiveDayData[i].dt_txt.split(" ")[0].replaceAll("-", "/");
        //
        let weatherIcon = fiveDayData[i].weather[0].icon;
        //
      }
    });
  });
}

window.addEventListener("load", generateForecastCards);
