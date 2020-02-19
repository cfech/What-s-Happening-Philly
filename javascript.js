// declared weather vars 

var  j=0
var APIKey = "20c488e0a9aff750eabd58301c43b3ce"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=" + APIKey;

$("#date").text(moment().format("dddd, MMMM Do"))
// ajax call for weather 
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log("TCL: response", response)
    var weatherDiv = $("<div>").addClass("list-group list-group-horizontal");

    var location = response.name
    console.log("TCL: location", location)
    var locationDiv = $("<text>").addClass("locationDiv list-group-item mr-2")
    locationDiv.text(location)

    var weatherCondition = response.weather[0].main
    console.log("TCL: weather", weatherCondition)
    var weatherConditionDiv = $("<text>").addClass("weatherCondition h3 mr-2")
    weatherConditionDiv.text("Condition :  " + weatherCondition)


    var tempKelvin = response.main.temp
    var tempF = (tempKelvin - 273.5) * 1.80 + 32
    console.log("TCL: tempF", tempF)
    var tempDiv = $("<text>").addClass("tempDiv h3 mr-2")
    tempDiv.text("Temp: " + tempF.toFixed(2) + " °F")

    var humidity = response.main.humidity
    console.log("TCL: humidity", humidity)
    var humidityDiv = $("<text>").addClass("humidityDiv h3 mr-2")
    humidityDiv.text("Humidity: " + humidity + "%")

    weatherDiv.append(weatherConditionDiv, tempDiv, humidityDiv)
    $("#weatherBox").append(weatherDiv)
})

$("#add-city").on("click", function () {
    event.preventDefault()
    $("#listArea").empty()

    var keyword = $("#event-search").val()
    console.log(keyword)
    var queryURL = `https://app.ticketmaster.com/discovery/v2/events?apikey=pPncRidh6JyeuAas12zGft9MGuVUEQiU&keyword=${keyword}&locale=*&startDateTime=2020-02-19T13:44:00Z&endDateTime=2020-03-31T13:44:00Z&city=philadelphia&size=100`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
        var listItems = (response._embedded.events)
        console.log("TCL: listItems", listItems)
        for(i=0; i<listItems.length; i++){
           
            var listItem = $("<li>")
        var itemName = listItems[i].name
        console.log("TCL: itemName", itemName, j++)
        var nameDiv = $("<div>").addClass("nameDiv")
        nameDiv.text(itemName)

        var date = listItems[i].dates.start.localDate
        console.log("TCL: date", date)
        var dateDiv = $('<div>').addClass("dateDiv")
        dateDiv.text(date)


        var time = listItems[i].dates.start.localTime
        console.log("TCL: time", time)
        var timeDiv = $("<div>").addClass("timeDiv")
        timeDiv.text(time)

        var venue = listItems[i]._embedded.venues[0].name
        console.log("TCL: venue", venue)
        var venueDiv = $("<div>").addClass("venueDiv")
        venueDiv.text(venue)

        listItem.append(nameDiv, dateDiv, timeDiv, venueDiv)
        console.log("TCL: listItem", listItem)
        $("#listArea").append(listItem)
        
        
        /// get details 
        }
    });
})