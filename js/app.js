var token;
var map;
var bounds;
var apiGoogleKey = "AIzaSyAw4baZsaSAhJJeGsVDTxZ2Cs3Y5ZlB8dU";
var apiMeetupKey = "4d6873686d486c47731744524257d17";
var apiActiveKey = "99txw4fpygq26mqamhq5ueha";

//http://stackoverflow.com/questions/1556921/google-map-api-v3-set-bounds-and-center

/* meetup api key http://www.meetup.com/meetup_api/auth/#keysign */


$(function() {

  String.prototype.trunc = String.prototype.trunc ||
        function(n){
            return (this.length > n) ? this.substr(0,n-1)+'&hellip;' : this;
        };

    $('#search-term').submit(function(event) {
        event.preventDefault();
        var aZipTerm = $('#zipinput').val();
        $('#search-results').empty();
        getMeetupRequest(aZipTerm);
    });


    $('#nextpage').click(function() {
        var searchTerm = $('#query').val();
        getRequest(searchTerm, token);

    });

});


function getMeetupRequest(azipcode) {
    /* Edit this one for Active */
    var params = {
        sign: 'true',
        key: '4d6873686d486c47731744524257d17',
        topic: 'tennis',
        country: 'us',
        //city: acity,
        //state: astate,
        zip: azipcode
    };
    url = 'https://api.meetup.com/2/open_events?callback=?';
    $.getJSON(url, params, callback);
    //token = data.nextPageToken;
    //showResults(data.items);
}

function callback(data) {
    console.log(data);

    var bounds = new google.maps.LatLngBounds();
    //var infowindow = new google.maps.InfoWindow();



    //Use API data to make an array of lat, longs for each event
    var markersarray = [];
    for (i = 0; i < data.results.length; i++) {
        if (data.results[i].venue && data.results[i].venue.lat !== 0)
            markersarray.push({
                name: data.results[i].name,
                lat: data.results[i].venue.lat,
                lon: data.results[i].venue.lon,
                description: data.results[i].description,
                url: data.results[i].event_url
            });
    }

    // Display multiple markers on a map
      var infoWindow = new google.maps.InfoWindow();

    // create markers for the events
    for (i = 0; i < markersarray.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(markersarray[i].lat, markersarray[i].lon),
            map: map
        });
        //extend the bounds to include each marker
        bounds.extend(marker.position);
        var item = markersarray[i];
        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, item) {
            return function() {
                infoWindow.setContent('<div class="info_content">' + '<h3><a href="'+ item.url + '">' + item.name + '</a></h3>' + '<p>' + item.description + '</p></div>');
                infoWindow.open(map, marker);
            };
        })(marker, item));

    }
    if (data.results.length > 1)
    //fit the map to the newly inclusive bounds
    map.fitBounds(bounds);
    else {
      alert("Sorry! No Tennis Meetups Nearby");
    }
}


/* initialize map */
function initialize() {
    //var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        center: {
            lat: 38.8904,
            lng: -77.0352
        },
        mapTypeId: 'roadmap',
        zoom: 8
    };

    //displaying a map on page
    map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
    map.setTilt(45);

}
