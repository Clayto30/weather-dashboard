const apiVariable = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
fetch(apiVariable).then(function(response){
    if (response.ok) {
        response.json()
    }
});