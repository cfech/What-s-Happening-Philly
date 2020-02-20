// declared vars 
var j = 0
var APIKey = "20c488e0a9aff750eabd58301c43b3ce"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=" + APIKey;
var startDate;

//Setting Date
$("#date").text(moment().format("dddd, MMMM Do"))

//reset variables 
$("#resetBtn").on("click", function () {
    startDate = ""
    endDate = ""
    $(".keywordSearch").addClass("d-none")
    $("#endBtn").removeClass("d-none")
    $("#listArea").empty()
    $("#start-date").val("mm/dd/yyyy")
    $("#end-date").val("mm/dd/yyyy")
    $("#errorRow").addClass("d-none")

})

// function initMap() {
//     var myLatLng = { lat: -25.363, lng: 131.044 };
//     var map = new google.maps.Map(document.getElementById('mapArea'), {
//         zoom: 4,
//         center: myLatLng
//     });
//     var marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         title: 'Hello World!'
//     });
// }
function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
  
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
        '(last visited June 22, 2009).</p>'+
        '</div>'+
        '</div>';
  
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
  
    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }
  

//setting date variables and un-hiding search bar
$("#endBtn").on("click", function () {
    event.preventDefault()
    startDate = $("#start-date").val()
    console.log(startDate)
    endDate = $("#end-date").val()
    console.log(endDate)
    if (startDate !== "" && endDate !== "") {
        $(".keywordSearch").removeClass("d-none")
        $("#endBtn").addClass("d-none")
        $("#errorRow").addClass("d-none")

    } else {
        $("#errorRow").removeClass("d-none")
    }
})

// ajax call for weather 
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log("TCL: response", response);
    //creation of weather div
    var weatherDiv = $("<div>").addClass("list-group list-group-horizontal");

    //creation and setting text of locationDiv 
    var location = response.name
    console.log("TCL: location", location)
    var locationDiv = $("<text>").addClass("locationDiv list-group-item mr-2")
    locationDiv.text(location)

    //creation and setting text of weatherConditionDiv
    var weatherCondition = response.weather[0].main
    console.log("TCL: weather", weatherCondition)
    var weatherConditionDiv = $("<text>").addClass("weatherCondition h3 mr-2")
    weatherConditionDiv.text("Condition :  " + weatherCondition)

    //creation and setting text of tempDiv
    var tempKelvin = response.main.temp
    var tempF = (tempKelvin - 273.5) * 1.80 + 32
    console.log("TCL: tempF", tempF)
    var tempDiv = $("<text>").addClass("tempDiv h3 mr-2")
    tempDiv.text("Temp: " + tempF.toFixed(2) + " °F")

    //creation and setting text of humidityDiv
    var humidity = response.main.humidity
    console.log("TCL: humidity", humidity)
    var humidityDiv = $("<text>").addClass("humidityDiv h3 mr-2")
    humidityDiv.text("Humidity: " + humidity + "%")

    //appending all divs to the page
    weatherDiv.append(weatherConditionDiv, tempDiv, humidityDiv)
    $("#weatherBox").append(weatherDiv)
})

//Call ajax function on clik of add-city button 
$("#add-city").on("click", function () {
    event.preventDefault()
    $("#listArea").empty()

    var keyword = $("#event-search").val()
    console.log(keyword)
    var queryURL = `https://app.ticketmaster.com/discovery/v2/events?apikey=pPncRidh6JyeuAas12zGft9MGuVUEQiU&keyword=${keyword}&locale=*&startDateTime=${startDate}T01:00:00Z&endDateTime=${endDate}T01:00:00Z&city=philadelphia&size=50&sort=date,asc`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
        var listItems = (response._embedded.events)
        console.log("TCL: listItems", listItems)
        for (i = 0; i < listItems.length; i++) {

            var listItem = $("<li>")
            var itemName = listItems[i].name
            console.log("TCL: itemName", itemName, j++)
            var nameDiv = $("<div>").addClass("nameDiv")
            nameDiv.text(itemName)

            var date = listItems[i].dates.start.localDate
            console.log("TCL: date", date)
            var dateDiv = $('<div>').addClass("dateDiv")
            dateDiv.text("Date:  " + date)

            var time = listItems[i].dates.start.localTime
            console.log("TCL: time", time)
            var timeDiv = $("<div>").addClass("timeDiv")
            timeDiv.text("Start Time: " + time)

            var venue = listItems[i]._embedded.venues[0].name
            console.log("TCL: venue", venue)
            var venueDiv = $("<div>").addClass("venueDiv")
            venueDiv.text("Location:  " + venue)

            listItem.append(nameDiv, dateDiv, timeDiv, venueDiv)
            console.log("TCL: listItem", listItem)
            $("#listArea").append(listItem)

            var longitude = listItems[i]._embedded.venues[0].location.longitude
            console.log("TCL: longitude", longitude);
            var latitude = listItems[i]._embedded.venues[0].location.latitude
            console.log("TCL: latitude", latitude);
        }
    });
})



// for (var i = 0; i < listItems.length; i++) {
//     var longitudeMarker = longitudeArray[i]
// }

// var longitudeArray[];
// var latitudeArray[];
// longitudeArray.push(longitude);
// latitudeArray.push(latitude);

