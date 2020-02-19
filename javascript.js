var APIKey = "20c488e0a9aff750eabd58301c43b3ce"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=" + APIKey;

$("#date").text(moment().format("dddd, MMMM Do"))

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
console.log("TCL: response", response)
 var weatherDiv = $("<div>")

 var location = response.name
 console.log("TCL: location", location)
 var locationDiv = $("<div>").addClass("locationDiv")
 locationDiv.text(location)

 var weatherCondition = response.weather[0].main
console.log("TCL: weather", weatherCondition)
var weatherConditionDiv = $("<div>").addClass("weatherCondition")
weatherConditionDiv.text("Condition :  " + weatherCondition)


var tempKelvin = response.main.temp
var tempF = (tempKelvin - 273.5) * 1.80 + 32
console.log("TCL: tempF", tempF)
var tempDiv = $("<div>").addClass("tempDiv")
tempDiv.text("Temp: " + tempF.toFixed(2) + " °F")

var humidity = response.main.humidity
console.log("TCL: humidity", humidity)
var humidityDiv = $("<div>").addClass("humidityDiv")
humidityDiv.text("Humidity: "+ humidity + "%")

weatherDiv.append(locationDiv, weatherConditionDiv, tempDiv, humidityDiv)
$("#weatherBox").append(weatherDiv)



})