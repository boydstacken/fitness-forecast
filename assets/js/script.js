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
