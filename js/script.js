var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
location + "&appid=" + APIKey;
var APIKey = f4591ef79b3933364d561e75edeb28da;
    $.ajax({
    url: weatherQueryURL,
    method: "GET"
    }).then(function (response) {
    console.log("TCL: response", response)
        // add lat and long variables
    });

        // Example queryURL for Giphy API
        var apikey = "pPncRidh6JyeuAas12zGft9MGuVUEQiU"
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + apikey + "&keyword=" + userInput + "&locale=*&startDateTime=2020-02-19T13:49:00Z&endDateTime=2020-03-31T13:49:00Z&page=1&city=Philadelphia&stateCode=PA"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(queryURL);
            console.log(response._embedded.events);

        });
