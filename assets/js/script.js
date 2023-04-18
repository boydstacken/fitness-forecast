var muscle = [
  ["Abdominals", "lower_back", "middle_back"],
  ["abductors", "Adductors", "Quadriceps"],
  ["Biceps", "triceps", "forearms"],
  ["Chest", "traps", "Lats"],
  ["glutes", "Hamstrings", "calves"],
];

var cardio = [
  ["Dance Fitness", "Spin Class", "Indoor Rock Climbing"],
  ["Swimming", "Kayaking", "Canoeing", "Paddle Boarding"],
  ["Biking", "Yoga", "Roller Skating", "Yard Work"],
  ["Running", "Jogging", "Hiking", "Jump Rope"],
  [
    "Ice Skating",
    "Skiing",
    "Snowboarding",
    "Snow Shoeing",
    "Cross Country Skiing",
  ],
];

var randomEx1 = Math.floor(Math.random() * 10);
var randomEx2 = 0;

var exeDay = 0;

function generateNumber() {
  randomEx2 = Math.floor(Math.random() * 10);
  if (randomEx1 !== randomEx2) {
    return randomEx2;
  } else {
    generateNumber();
  }
}


function generateWorkout() {
  if (exeDay > 4) {
    exeDay=0;
  randomExercises()}
    else
  randomExercises();
  exeDay++
  console.log(exeDay)

 
  } 



function randomExercises() {
  for (i = 0; i <= 2; i++) {
    fetch(
      `https://api.api-ninjas.com/v1/exercises?muscle=${muscle[exeDay][i]}`,
      {
        method: "GET",
        headers: { "X-Api-Key": "JTo+3b4INS07H1+MuR5ygw==xgXVzkHdaEOHWO1Y" },
        contentType: "application/json",
      }
    ).then(function (response) {
      if (!response.ok) {
        return response.json();
      }

      response.json([0]).then(function (data) {
        let mainWorkout = $("<p>");
        mainWorkout.text((data[randomEx1].name) + (data[randomEx2].name))
        mainWeatherCard.append(mainWorkout)
  
  
      }

      );
    })
  }
};


// -------------------------------------------------------------------
mainWeatherCard = $("#mainWeatherCard");
pageBody = $("#page-content");
function generateForecastCards() {
  clearOld();

  let cityName = $("#user-city").val();
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=acbf659b6dad995f4221a78b638e6923`;
  fetch(weatherUrl).then(function (response) {
    if (!response.ok) {
      return response.json();
    }
    response.json().then(function (data) {
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
        let humidity = `Humidity: ${fiveDayData[i].main.humidity}%`;
        //
        let date = fiveDayData[i].dt_txt.split(" ")[0].replaceAll("-", "/");
        //
        let weatherIcon = fiveDayData[i].weather[0].icon;
        //
        let cardioWorkout = "";
        //
        let weatherCondition = fiveDayData[i].weather[0].main;
        let tempCompare = fiveDayData[i].main.temp.toFixed(2);
        console.log(weatherCondition);
        console.log(tempCompare);
        if (weatherCondition === "Rain" || tempCompare <= 31) {
          cardioWorkout =
            cardio[0][Math.floor(Math.random() * cardio[0].length)];
        } else if (weatherCondition === "Snow") {
          cardioWorkout =
            cardio[4][Math.floor(Math.random() * cardio[4].length)];
        } else if (tempCompare <= 50) {
          cardioWorkout =
            cardio[3][Math.floor(Math.random() * cardio[3].length)];
        } else if (tempCompare <= 84) {
          cardioWorkout =
            cardio[2][Math.floor(Math.random() * cardio[2].length)];
        } else if (tempCompare > 84) {
          cardioWorkout =
            cardio[1][Math.floor(Math.random() * cardio[1].length)];
        }

        if (i === 0) {
          //
          let mainTitle = $("<h1>");
          mainTitle.addClass("mainCardTitle");
          mainTitle.text(`Weather for ${date} in ${cityName}`);
          mainWeatherCard.append(mainTitle);
          //
          let mainIcon = $("<img>");
          mainIcon.addClass("mx-auto justify-self-center");
          mainIcon.attr(
            "src",
            `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
          );
          mainWeatherCard.append(mainIcon);
          //
          let mainTemp = $("<p>");
          mainTemp.text(`${temp}`);
          mainWeatherCard.append(mainTemp);
          //
          let mainHumidity = $("<p>");
          mainHumidity.text(`${humidity}`);
          mainWeatherCard.append(mainHumidity);
          //
          let mainCardio = $("<p>");
          mainCardio.text("Cardio: " + cardioWorkout);
          mainWeatherCard.append(mainCardio);
        } else {
          let card = $("<div>");
          card.addClass("container bg-blue-600 w-80 h-60 text-2xl dayCastCard");
          pageBody.append(card);
          //
          let cardBody = $("<div>");
          cardBody.addClass("card-body");
          card.append(cardBody);
          //
          let cardTitle = $("<h3>");
          cardTitle.addClass("card-title");
          cardTitle.text(date);
          cardBody.append(cardTitle);
          //
          let cardIcon = $("<img>");
          cardIcon.addClass("mx-auto justify-self-center");
          cardIcon.attr(
            "src",
            `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
          );
          cardBody.append(cardIcon);
          //
          let cardTemp = $("<p>");
          cardTemp.addClass("card-text");
          cardTemp.text(temp);
          cardBody.append(cardTemp);
          //
          let cardHumidity = $("<p>");
          cardHumidity.addClass("card-text");
          cardHumidity.text(humidity);
          cardBody.append(cardHumidity);
          //
          let cardCardio = $("<p>");
          cardCardio.text("Cardio: " + cardioWorkout);
          cardBody.append(cardCardio);
          //
        }
      }
    });
  });
}

function clearOld() {
  document.querySelectorAll("[class*=dayCastCard]").forEach((element) => {
    element.style.display = "none";
  });
  mainWeatherCard.text("");
}

window.addEventListener("search", () => {
  generateForecastCards();
  generateWorkout();
})

