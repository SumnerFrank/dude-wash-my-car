let googleMapsAPIKey = "AIzaSyArQBDsOARK_GeyEeCaALzi3lV5Tci96X4"
let weatherAPIKey = "49b73569e66f42dc9f950608222312"

  //google map for places
  let map;
  let service;
  let infowindow;
  
  function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -33.866, lng: 151.196 },
      zoom: 15,
    });
    const request = {
      placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
      fields: ["name", "formatted_address", "place_id", "geometry"],
    };
    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
  
    service.getDetails(request, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
        });
  
        google.maps.event.addListener(marker, "click", () => {
          const content = document.createElement("div");
          const nameElement = document.createElement("h2");
  
          nameElement.textContent = place.name;
          content.appendChild(nameElement);
  
          const placeIdElement = document.createElement("p");
  
          placeIdElement.textContent = place.place_id;
          content.appendChild(placeIdElement);
  
          const placeAddressElement = document.createElement("p");
  
          placeAddressElement.textContent = place.formatted_address;
          content.appendChild(placeAddressElement);
          infowindow.setContent(content);
          infowindow.open(map, marker);          
        });
      }
    });
  }
  
  window.initMap = initMap;
  

//search bar for map
function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

//window.initAutocomplete = initAutocomplete;
initAutocomplete();

//var tag = document.createElement('script');

      // tag.src = "https://www.youtube.com/iframe_api";
      // var firstScriptTag = document.getElementsByTagName('script')[0];
      // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // // 3. This function creates an <iframe> (and YouTube player)
      // //    after the API code downloads.
      // var player;
      // function onYouTubeIframeAPIReady() {
      //   player = new YT.Player('player', {
      //     height: '390',
      //     width: '640',
      //     videoId: 'Kc-3B6CWHTo',
      //     playerVars: {
      //       'playsinline': 1
      //     },
      //     events: {
      //       'onReady': onPlayerReady,
      //       'onStateChange': onPlayerStateChange
      //     }
      //   });
      // }

      // // 4. The API will call this function when the video player is ready.
      // function onPlayerReady(event) {
      //   event.target.playVideo();
      // }

      // // 5. The API calls this function when the player's state changes.
      // var done = false;
      // function onPlayerStateChange(event) {
      //   if (event.data == YT.PlayerState.PLAYING && !done) {
      //     setTimeout(stopVideo, 6000);
      //     done = true;
      //   }
      // }
      // function stopVideo() {
      //   player.stopVideo();
      // }

    //Search button for three day weather forecast
    $("#search-button").on("click",function(){
      let searchValue = $("#search-input").val()
      console.log(searchValue)
      getThreeDayForecast(searchValue)
    })

    //function to call weatherAPI
     function getThreeDayForecast(searchValue) {
       fetch(`http://api.weatherapi.com/v1/forecast.json?key=49b73569e66f42dc9f950608222312&q=${searchValue}&days=3`)
      .then(Response => Response.json())
      .then(data => {
        console.log(data)
      //for loop to gather weather crteria and append each weather category
      $("#forecast").empty()
      for (var i = 0; i < data.forecast.forecastday.length; i ++) {
        console.log(data.forecast.forecastday[i])
        let weatherCard = $("<div>").addClass("card-style")
        let icon = $("<img>").attr("src", "http://cdn.weatherapi.com/weather/64x64/day/176.png")    
        let temp = $("<p>").text("Temperature: " + data.forecast.forecastday[i].day.maxtemp_f + " \u00B0F")
        let rain = $("<p>").text("Chance of Rain: " + data.forecast.forecastday[i].day.daily_will_it_rain + "%")  
        let snow = $("<p>").text("Chance of Snow: " + data.forecast.forecastday[i].day.daily_will_it_snow + "%")
        let condition = $("<p>").text("Condition: " + data.forecast.forecastday[i].day.condition.text)        
        weatherCard.append(icon, temp, rain, snow, condition)
        $("#forecast").append(weatherCard)
        }
      })
     }

