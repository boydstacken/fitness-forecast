var muscle = ["day1", "day2", "day3", "day4", "day5"];

var day1 = ["Abdominals", "lower_back", "middle_back"]
var day2 = ["abductors", "Adductors", "Quadriceps"]
var day3 = ["Biceps", "triceps", "forearms"]
var day4 = ["Chest", "traps", "Lats"]
var day5 = ["glutes", "Hamstrings", "calves"]

var randomEx1 = Math.floor(Math.random() * 10);
var randomEx2 = 0;

function generateNumber() {
  randomEx2 = Math.floor(Math.random() * 10);
  if (randomEx1 !== randomEx2) {
    return randomEx2;
  } else {
    generateNumber();
  }
}

for (i=0; i<3; i++) {
fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${day1[i]}`, {
  method: "GET",
  headers: { "X-Api-Key": "JTo+3b4INS07H1+MuR5ygw==xgXVzkHdaEOHWO1Y" },
  contentType: "application/json",
}).then(function (response) {
  if (!response.ok) {
    return response.json();
  }
  response.json([0]).then(function (data) {
    console.log(data[randomEx1])
     console.log(data[randomEx2])}
  );
})};


let cityName = "Madison";
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=acbf659b6dad995f4221a78b638e6923`;
fetch(weatherUrl).then(function (response) {
  if (!response.ok) {
    return response.json();
  }
  response.json().then(function (data) {
    console.log(data);
  });
});

