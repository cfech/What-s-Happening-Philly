// declared vars
var j = 0;
var APIKey = "20c488e0a9aff750eabd58301c43b3ce";
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=" +
  APIKey;
var startDate;

itemsArray = [];
$(document).ready(function () {
  //Setting Date
  $("#date").text(moment().format("dddd, MMMM Do"));

  //reset variables
  $("#resetBtn").on("click", function () {
    startDate = "";
    endDate = "";
    $(".keywordSearch").addClass("d-none");
    $("#endBtn").removeClass("d-none");
    $("#listArea").empty();
    $("#start-date").val("mm/dd/yyyy");
    $("#end-date").val("mm/dd/yyyy");
    $("#errorRow").addClass("d-none");
  });

  //setting date variables and un-hiding search bar
  $("#endBtn").on("click", function () {
    event.preventDefault();
    startDate = $("#start-date").val();
    console.log(startDate);
    endDate = $("#end-date").val();
    console.log(endDate);
    if (startDate !== "" && endDate !== "") {
      $(".keywordSearch").removeClass("d-none");
      $("#endBtn").addClass("d-none");
      $("#errorRow").addClass("d-none");
    } else {
      $("#errorRow").removeClass("d-none");
    }
  });

  // ajax call for weatherCF
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log("TCL: response", response);
    //creation of weather divCF
    var weatherDiv = $("<div>").addClass(
      "list-group list-group-vertical"
    );

    //creation and setting text of locationDivCF
    var location = response.name;
    console.log("TCL: location", location);
    var locationDiv = $("<div>").addClass("locationDiv mr-2");
    locationDiv.text(location);

    //creation and setting text of weatherConditionDivCF
    var weatherCondition = response.weather[0].main;
    console.log("TCL: weather", weatherCondition);
    var weatherConditionDiv = $("<div>").addClass(
      "weatherCondition text-dark mr-2"
    );
    weatherConditionDiv.text("Condition :  " + weatherCondition);

    //creation and setting text of tempDivCF
    var tempKelvin = response.main.temp;
    var tempF = (tempKelvin - 273.5) * 1.8 + 32;
    console.log("TCL: tempF", tempF);
    var tempDiv = $("<div>").addClass("tempDiv tempDiv mr-2");
    tempDiv.text("Temp: " + tempF.toFixed(2) + " °F");

    //creation and setting text of humidityDivCF
    var humidity = response.main.humidity;
    console.log("TCL: humidity", humidity);
    var humidityDiv = $("<div>").addClass("humidityDiv mr-2");
    humidityDiv.text("Humidity: " + humidity + "%");

    //appending all divs to the pageCFDELETE THIS COMMENT
    //this string is for the weather dashboard animationKG

    weatherDiv.append(locationDiv, weatherConditionDiv, tempDiv, humidityDiv);
    $("#weatherBox").append(weatherDiv);
  });
  // var myLatLng = {lat: -39.952 , lng:-75.165  };
  // var map = new google.maps.Map(document.getElementById('mapArea'), {
  // });
  // var marker = new google.maps.Marker({
  //   position: myLatLng,
  //   map: map,
  // });
  var globalMap;
  function initMap() {
    var myLatLng = { lat: 39.952, lng: -75.165 };
    var locationLatLong = { lat: 39.952, lng: -75.165 };
    var map = new google.maps.Map(document.getElementById("mapArea"), {
      zoom: 11,
      center: myLatLng
    });
    globalMap = map;
  }

  initMap();

  //Call ajax function on clik of add-city button
  $("#add-city").on("click", function () {
    event.preventDefault();
    $("#listArea").empty();

    var keyword = $("#event-search").val();
    console.log(keyword);
    var queryURL = `https://app.ticketmaster.com/discovery/v2/events?apikey=pPncRidh6JyeuAas12zGft9MGuVUEQiU&keyword=${keyword}&locale=*&startDateTime=${startDate}T01:00:00Z&endDateTime=${endDate}T01:00:00Z&city=philadelphia&size=50&sort=date,asc`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      console.log(queryURL);
      var listItems = response._embedded.events;
      console.log("TCL: listItems", listItems);
      for (let i = 0; i < listItems.length; i++) {
        //longitude & Latitude
        var longitude =
          Math.random() / 800 +
          parseFloat(listItems[i]._embedded.venues[0].location.longitude);
        console.log("TCL: longitude", longitude);

        var latitude =
          Math.random() / 800 +
          parseFloat(listItems[i]._embedded.venues[0].location.latitude);
        console.log("TCL: latitude", latitude);

        var listItem = $("<li>").addClass("pb-2")
        listItem.attr("data-lat", latitude);
        listItem.attr("data-lon", longitude);

        var itemName = listItems[i].name;
        console.log("TCL: itemName", itemName, j++);
        var nameDiv = $("<div>").addClass("nameDiv");
        nameDiv.text(itemName);
        itemsArray.push(itemName);

        var date = listItems[i].dates.start.localDate;
        console.log("TCL: date", date);
        var dateDiv = $("<div>").addClass("dateDiv");
        dateDiv.text("Date:  " + date);

        var time = listItems[i].dates.start.localTime;
        console.log("TCL: time", time);
        var timeDiv = $("<div>").addClass("timeDiv");
        timeDiv.text("Start Time: " + time);

        var venue = listItems[i]._embedded.venues[0].name;
        console.log("TCL: venue", venue);
        var venueDiv = $("<div>").addClass("venueDiv");
        venueDiv.text("Location:  " + venue);

        listItem.attr(
          "data-name",
          "<p>" +
          itemName +
          "</p><p> Date: " +
          date +
          "   Start Time: " +
          time +
          "</p><p> Venue: " +
          venue
        );

        listItem.append(nameDiv, dateDiv, timeDiv, venueDiv);
        console.log("TCL: listItem", listItem);
        $("#listArea").append(listItem);

        //map markers

        // get details
      }
    });
  });

  $(document).on("click", "li", function () {
    console.log("clicked");
    console.log($(this));
    var dataLatitude = parseFloat($(this).attr("data-lat"));
    var dataLongitude = parseFloat($(this).attr("data-lon"));
    var place = { lat: dataLatitude, lng: dataLongitude };
    var marker = new google.maps.Marker({
      position: place,
      map: globalMap
    });

    //function for clicking on the marker
    var dataName = $(this).attr("data-name");
    var infoWindow = new google.maps.InfoWindow({
      content: dataName
    });
    google.maps.event.addListener(marker, "click", function () {
      console.log("clicked");
      infoWindow.open(globalMap, marker);
    });
  });
});

// function swapImages(){
//     var $active = $('#imgGallery .active');
//     var $next = ($('#imgGallery .active').next().length > 0) ? $('#imgGallery .active').next() : $('#imgGallery img:first');
//     $active.fadeOut(function(){
//     $active.removeClass('active');
//     $next.fadeIn().addClass('active');
//     });
//   }
// ​
//   $(document).ready(function(){
//      Run our swapImages() function every 10800secs= every 3 hours daytime to dusk to nighttime
//     setInterval('swapImages()', 10800);
//   }
// <---CZ-->
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})