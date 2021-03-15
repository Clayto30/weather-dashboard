var currentDate = moment().format("M/D/YYYY")
let day1 = moment().add(1, 'days').format("M/D/YYYY")
let day2 = moment().add(2, 'days').format("M/D/YYYY")
let day3 = moment().add(3, 'days').format("M/D/YYYY")
let day4 = moment().add(4, 'days').format("M/D/YYYY")
let day5 = moment().add(5, 'days').format("M/D/YYYY")
$(".list-group").append($("<li>")
    .text(localStorage.getItem("cities"))
    .addClass("list-group-item"));
var firstCall = function () {
    const apiVariable = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=8c80d8298e030c2bcd364a2cd23ed526"
    fetch(apiVariable).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                $(".city-card").append(cityName + " (" + currentDate + ")");
                //$('#theDiv').prepend('<img id="theImg" src="theImg.png" />')
                //$('#theDiv').prepend($('<img>',{id:'theImg',src:'theImg.png'}))
                //console.log(data.weather.icon)
                //$("#img0").append("<img src='https://openweathermap.org/img/wn/'" + data.weather.icon + "2x.png>")
                $(".hum0").append(data.main.humidity + "%");
                $(".temp0").append(data.main.temp + " F");
                $(".wind0").append(data.wind.speed + " MPH");
                dataLat = data.coord.lat;
                dataLon = data.coord.lon;
                localStorage.setItem("cities", cityName);
                secondCall(dataLat, dataLon);
            })
        } else {
            alert("C'mon! Put in a real city!!!")
        }

    });
};
// do a second API call for five day forecast and UV index 
var secondCall = function () {
    const apiFiveVariable = "https://api.openweathermap.org/data/2.5/onecall?lat=" + dataLat + "&lon=" + dataLon + "&units=imperial&appid=8c80d8298e030c2bcd364a2cd23ed526"
    fetch(apiFiveVariable).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                $(".badge").text(data.current.uvi)
                if (data.current.uvi < 3) {
                    $(".badge")
                        .removeClass("badge-danger badge-warning")
                        .addClass("badge-success")
                } else if (data.current.uvi > 5) {
                    $(".badge")
                        .removeClass("badge-success badge-warning")
                        .addClass("badge-danger")
                } else {
                    $(".badge")
                        .removeClass("badge-success badge-danger")
                        .addClass("badge-warning")
                }
                // append temp & humidity to forecast cards
                $(".temp1").append(" " + data.daily[0].temp.day + "F")
                $(".hum1").append(" " + data.daily[0].humidity + "%")
                $(".temp2").append(" " + data.daily[1].temp.day + "F")
                $(".hum2").append(" " + data.daily[1].humidity + "%")
                $(".temp3").append(" " + data.daily[2].temp.day + "F")
                $(".hum3").append(" " + data.daily[2].humidity + "%")
                $(".temp4").append(" " + data.daily[3].temp.day + "F")
                $(".hum4").append(" " + data.daily[3].humidity + "%")
                $(".temp5").append(" " + data.daily[4].temp.day + "F")
                $(".hum5").append(" " + data.daily[4].humidity + "%")
            })
        } else {
            alert("It didn't work! Sorry :(")
        };
    });
}
// get the search term when button is clicked and put into api call 
$("button").on("click", function () {
    event.preventDefault();
    cityName = $("input").val()
    console.log(cityName);
    firstCall();
});
// append 5 dates to the forecast cards
$(".day1-card").append(day1)
$(".day2-card").append(day2)
$(".day3-card").append(day3)
$(".day4-card").append(day4)
$(".day5-card").append(day5)
// search for the city in your localStorage
$("li").on("click", function () {
    var savedCity = $("li").text();
    var apiVariableSaved = "https://api.openweathermap.org/data/2.5/weather?q=" + savedCity + "&units=imperial&appid=8c80d8298e030c2bcd364a2cd23ed526"
    fetch(apiVariableSaved).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                $(".city-card").append(savedCity + " (" + currentDate + ")");
                $(".hum0").append(data.main.humidity + "%");
                $(".temp0").append(data.main.temp + " F");
                $(".wind0").append(data.wind.speed + " MPH");
                dataLat = data.coord.lat;
                dataLon = data.coord.lon;
                localStorage.setItem("cities", savedCity);
                secondCall(dataLat, dataLon);
            })
        }
    })
});