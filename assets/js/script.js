var muscleGroups = [
  ["Abdominals", "lower_back", "middle_back"],
  ["abductors", "Adductors", "Quadriceps"],
  ["Biceps", "triceps", "forearms"],
  ["Chest", "traps", "Lats"],
  ["glutes", "Hamstrings", "calves"],
];

var groupNames = ["Core", "Hips", "Arms", "Chest", "Legs"]





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
var muscleLoop = 0;
let mainWorkoutCard = $("#mainWorkoutCard");
let futureWorkoutCard = $("#futureWorkoutCard");

function generateNumber() {
  randomEx2 = Math.floor(Math.random() * 10);
  if (randomEx1 !== randomEx2) {
    return randomEx2;
  } else {
    generateNumber();
  }
}

// for (i = 0; i <= 4; i++) {
//   if (exeDay > 4) {
//     clearInterval(exeDay);
//   } else {
//     generateWorkout();
//     exeDay++;
//   }
// }


function futureWorkouts(){
  for (i = 1; i <= 4; i++) {
    let futureWorkout = $("<p>");
    futureWorkout.text(groupNames[i] + " : " + muscleGroups[i]);
    futureWorkoutCard.append(futureWorkout);
  }
  }

function workoutText(){
    // for (i=0; i<=2; i++)
    generateWorkout()
    muscleLoop++
    generateWorkout()
    muscleLoop++
    generateWorkout()
  }



  function generateWorkout() {
    console.log("here also")
    console.log(muscleLoop)
  
    generateNumber()


    fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscleGroups[exeDay][muscleLoop]}`,
      {
        method: "GET",
        headers: { "X-Api-Key": "JTo+3b4INS07H1+MuR5ygw==xgXVzkHdaEOHWO1Y" },
        contentType: "application/json",
      }
    ).then(function (response) {
      if (!response.ok) {
        return response.json();
      }
      response.json().then(function (data) {

        var Ex1 = (data[randomEx1].name)
        var Ex2 = (data[randomEx2].name)

        let mainWorkout1 = $("<p>");
        let mainWorkout2 = $("<p>");

       
          mainWorkout1.text(Ex1);
          mainWorkoutCard.append(mainWorkout1);

          mainWorkout2.text(Ex2);
          mainWorkoutCard.append(mainWorkout2);
  
        // console.log(Ex1)
        // console.log(Ex2)

      });
    });
  }





  // -------------------------------------------------------------------
  let mainWeatherCard = $("#mainWeatherCard");
  let pageBody = $("#page-content");
  let cityName = "";
  function generateForecastCards(cityName) {
    clearOldWeather();
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
          let tempLookUp = 0;
          if (weatherCondition === "Rain" || tempCompare <= 31) tempLookUp = 0;
          else if (weatherCondition === "Snow") tempLookUp = 4;
          else if (tempCompare <= 50) tempLookUp = 3;
          else if (tempCompare <= 84) tempLookUp = 2;
          else if (tempCompare > 84) tempLookUp = 1;

          cardioWorkout =
            cardio[tempLookUp][
            Math.floor(Math.random() * cardio[tempLookUp].length)
            ];
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
        localStorage.setItem("City", cityName);
      });
    });
  }

  function clearOldWeather() {
    document.querySelectorAll("[class*=dayCastCard]").forEach((element) => {
      element.style.display = "none";
    });
    mainWeatherCard.text("");
  }


  window.addEventListener("load", () => {
    cityName = localStorage.getItem("City");
    if (cityName == null) return;
    generateForecastCards(cityName);
    workoutText();
    futureWorkouts()
  });
  window.addEventListener("search", () => {
    cityName = $("#user-city").val();
    generateForecastCards(cityName);
  });
