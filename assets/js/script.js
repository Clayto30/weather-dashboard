//let dataLat = ""
//let dataLon = ""
let uvNum = ""
var firstCall = function () {
    const apiVariable = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=8c80d8298e030c2bcd364a2cd23ed526"
    fetch(apiVariable).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log("the humidty is " + data.main.humidity + "%");
                console.log("the temperature is " + data.main.temp);
                console.log("the wind speed is " + data.wind.speed);
                console.log(data.weather.icon);
                console.log("the latitude is " + data.coord.lat);
                console.log("the longitude is " + data.coord.lon);
                dataLat = data.coord.lat;
                dataLon = data.coord.lon;
                secondCall(dataLat, dataLon);
            })
        } else {
            alert("c'mon! Put in a real US city!!!")
        }

    });
};

var secondCall = function () {
    const apiFiveVariable = "https://api.openweathermap.org/data/2.5/onecall?lat=" + dataLat + "&lon=" + dataLon + "&units=imperial&appid=8c80d8298e030c2bcd364a2cd23ed526"
    fetch(apiFiveVariable).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
                console.log(data.current.uvi)
            })
        } else {
            console.log("It didn't work!")
        };
    });
}
// get the search term when button is clicked and put into api call 
$("button").on("click", function () {
    event.preventDefault();
    console.log("the button was clicked");
    console.log(this);
    cityName = $("input").val()
    console.log(cityName);
    firstCall();
});