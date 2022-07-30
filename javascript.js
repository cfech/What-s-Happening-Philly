// declared varsCF
var j = 0;
var APIKey = "";
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=" +
  APIKey;
var startDate;
var marker;

let itemsArray = [];
$(document).ready(function () {
  //Setting DateCF
  //KATIA BRANCH NOTE-CHANGED MOMENT DATE FORMATKG
  $("#date").text(moment().format("dddd, MMMM Do YYYY"));

  //reset variablesCF
  $("#resetBtn").on("click", function () {
    startDate = "";
    endDate = "";
    $(".keywordSearch").addClass("d-none");
    $("#endBtn").removeClass("d-none");
    $("#listArea").empty();
    $("#start-date").val("mm/dd/yyyy");
    $("#end-date").val("mm/dd/yyyy");
    $("#errorRow").addClass("d-none");
    marker.setMap(null);
  });

  //setting date variables and un-hiding search barCF
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
    var weatherDiv = $("<div>").addClass("list-group list-group-vertical");

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
  // });CF
  var globalMap;
  function initMap() {
    var myLatLng = { lat: 39.952, lng: -75.165 };
    var locationLatLong = { lat: 39.952, lng: -75.165 };
    map = new google.maps.Map(document.getElementById("mapArea"), {
      zoom: 11,
      center: myLatLng
    });
    globalMap = map;
  }

  setTimeout(function () { 
    console.log("map")
    initMap(); 
  }, 1000);
  

  //Call ajax function on click of add-city buttonCF
  $("#add-city").on("click", function () {

    event.preventDefault();
    console.log("hello")
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

        var listItem = $("<li>");
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
        dateDiv.text(
          "Date:  " + moment(date, "YYYY-MM-DD").format("MMM Do YYYY")
        );

        var time = listItems[i].dates.start.localTime;
        console.log("TCL: time", time);
        var timeDiv = $("<div>").addClass("timeDiv");
        timeDiv.text("Start Time: " + moment(time, "H").format("hh:mmA"));

        var venue = listItems[i]._embedded.venues[0].name;
        console.log("TCL: venue", venue);
        var venueDiv = $("<div>").addClass("venueDiv");
        venueDiv.text("Location:  " + venue);

        listItem.attr(
          "data-name",
          "<p>" +
          itemName +
          "</p><p> Date: " +
          moment(date, "YYYY-MM-DD").format("MMM Do YYYY") +
          "   Start Time: " +
          moment(time, "H").format("hh:mmA") +
          "</p><p> Venue: " +
          venue
        );

        listItem.append(nameDiv, dateDiv, timeDiv, venueDiv);
        console.log("TCL: listItem", listItem);
        $("#listArea").append(listItem);

        //map markersCF

        // get detailsCF
      }
    });
  });

  $(document).on("click", "li", function () {
    console.log("clicked");
    console.log(marker);
    if (marker !== undefined) {
      marker.setMap(null);
    }
    console.log($(this));
    var dataLatitude = parseFloat($(this).attr("data-lat"));
    var dataLongitude = parseFloat($(this).attr("data-lon"));
    var place = { lat: dataLatitude, lng: dataLongitude };
    marker = new google.maps.Marker({
      position: place,
      map: globalMap
    });

    //function for clicking on the markerCF
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

//deleted swap images functions did not workKG//
//Functions to rotate bg images throughout the day
$(document).ready(function () {
  var bgHour = parseInt(moment().format("k"));
  switch (bgHour) {
    case 1:
    case 2:
    case 3:
      $("body")
        .css(
          "background-image",
          'url("./images/Philadelphia_Pennsylvania_USA_Boathouse_Row_at_night_2009.jpg")'
        )
        .attr("alt", "Philadelphia Boathouse Row lit up at night");
      break;
    case 4:
    case 5:
    case 6:
      $("body")
        .css(
          "background-image",
          'url("./images/PhiladelphiaMuseumOfArt2017.jpg")'
        )
        .attr("alt", "Philadelphia Museum of Art during the day");
      break;
    case 7:
    case 8:
    case 9:
      $("body")
        .css(
          "background-image",
          'url("./images/Philadelphia_skyline_from_the_Spring_Garden_Street_Bridge_2018.jpg")'
        )
        .attr("alt", "Philadelphia skyline from Spring Garden St Bridge");
      break;
    case 10:
    case 11:
    case 12:
      $("body")
        .css("background-image", 'url("./images/Pats_and_Genos.jpg")')
        .attr(
          "alt",
          "corner of Philly street featuring Pats and Geno's steaks restaraunts"
        );
      break;
    case 13:
    case 14:
    case 15:
      $("body")
        .css("background-image", 'url("./images/City_hall_Philadelphia.jpg")')
        .attr("alt", "Philly City Hall in the afternoon");
      break;
    case 16:
    case 17:
    case 18:
      $("body")
        .css("background-image", 'url("./images/Kimmel_Center_cropped.jpg")')
        .attr("alt", "Kimmel Center lit at night");
      break;
    case 19:
    case 20:
    case 21:
      $("body")
        .css("background-image", 'url("./images/City_hall_Philadelphia.jpg")')
        .attr("alt", "Philly City Hall lit at night");
      break;
    case 22:
    case 23:
    case 24:
      $("body")
        .css(
          "background-image",
          'url("./images/30th_Street_Station_Philadelphia_July_2016_002.jpg")'
        )
        .attr("alt", "Philly 30th Street Station at night");
  }
  console.log(bgHour);
});
// <---CZ-->
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
