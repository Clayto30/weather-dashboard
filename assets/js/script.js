let cityName = "chicago"
let dataLat = ""
let dataLon = ""
const apiVariable = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=8c80d8298e030c2bcd364a2cd23ed526"
const apiFiveVariable = "https://api.openweathermap.org/data/2.5/onecall?lat=" + dataLat + "&lon=" + dataLon + "units=imperial&appid=8c80d8298e030c2bcd364a2cd23ed526"
fetch(apiVariable).then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            console.log(data.main.humidity);
            console.log(data.main.temp);
            console.log(data.wind.speed);
            console.log(data.weather.icon);
            console.log(data.coord.lat);
            console.log(data.coord.lon);
            dataLat = data.coord.lat;
            dataLon = data.coord.lon;
        })
    }
    secondCall;
});

var secondCall = function () {
    fetch(apiFiveVariable).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
            })
        } else {
            console.log("It didn't work!")
        };
    });
}