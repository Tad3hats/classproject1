// Initialize Firebase
var config = {
  apiKey: "AIzaSyCC-rQegYabOAZv5DNs49WLHtnGxYJFdTo",
  authDomain: "mytrp-17e8e.firebaseapp.com",
  databaseURL: "https://mytrp-17e8e.firebaseio.com",
  projectId: "mytrp-17e8e",
  storageBucket: "mytrp-17e8e.appspot.com",
  messagingSenderId: "407562169873"
};

firebase.initializeApp(config);

var database = firebase.database();

// Function that clears out database
function clearDatabase() {
  database.ref().set({
    hotelVideoResults: [],
    trendingVideoResults: []

  })
}

// on document ready call clearDatabase function 
$(document).ready(function () {
  clearDatabase();
});

// on click of the go button run this function
$("#go-button").on("click", function (event) {
  event.preventDefault();
  // clear the database
  clearDatabase();
  // clear the html by dumping all divs
  $("#trending-videos").empty();
  $("#hotel-videos").empty();
  $("#map").empty();
  $("#most-liked-header").empty();

  // grab user input from search bar
  var searchTerm = $("#searchInput").val().trim();
  // use search term to populate the google map and append it to the html
  var mapHeader = $("<h1>Map</h1>");
  var mapDiv = $("<div>");
  var createMapIFrame = $('<br><iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAimomop0IzZOIELamWA3Ex_au10wqv25Y&q=' + searchTerm + '"allowfullscreen"></iframe>');
  mapDiv.append(createMapIFrame);
  $("#map").prepend(mapHeader);
  $("#map").append(mapDiv);
  // add headers to each section 
  var trendingHeader = $("<h1>What's Trending</h1>");
  $("#trending-videos").prepend(trendingHeader);
  var hotelHeader = $("<h1>Hotel Info</h1>");
  $("#hotel-videos").prepend(hotelHeader);
  var inspoHeader = $("<h1>My Inspiration Board</h1>");
  $("#most-liked-header").prepend(inspoHeader);

  // clear out the user input from search field
  $(".form-control-lg").val("")

  // youtube api call to go grab trending vidoes
  var trendingQueryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=things+to+do+in+" + searchTerm + "&type=video&videoCaption=closedCaption&maxResults=3&key=AIzaSyDkyhWrY5vrU3x1xIKmzlyjaKX3mBGKTJ8";
  // ajax call retuerning those results from youtube
  $.ajax({
    url: trendingQueryURL,
    method: "GET"
  }).then(function (response) {
    // loop through results and take out the videoid of each response
    var results = response.items;

    for (var i = 0; i < results.length; i++) {

      var trendingVideoResults = response.items[i].id.videoId;
      // push the results into Firebase
      database.ref('trending').push({
        videoId: trendingVideoResults,
        type: "trending"
      });
    }

  });

  // youtube api call to go grab hotel reltated vidoes
  var hotelQueryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=hotel+in+" + searchTerm + "&type=video&videoCaption=closedCaption&maxResults=3&key=AIzaSyDkyhWrY5vrU3x1xIKmzlyjaKX3mBGKTJ8";
  // ajax call retuerning those results from youtube
  $.ajax({
    url: hotelQueryURL,
    method: "GET"
  }).then(function (response) {
    // loop through results and take out the videoid of each response
    var results = response.items;

    for (var i = 0; i < results.length; i++) {

      var hotelVideoResults = response.items[i].id.videoId;
      // push the results into Firebase
      database.ref('hotel').push({
        videoId: hotelVideoResults,
        type: "hotel"
      });
    }

  });
});

// setting a index that will count so we can iterate and assign unique ids to each video
var trendingIndex = 0;
// refing the trending child in firebase
database.ref('trending').on("child_added", function (childSnapshot) {
  // grabbing the videoids from firebase and dynamically creating elements then appending to hmtl
  var videoId = childSnapshot.val().videoId;
  // creation of elements
  var trendingVideosDiv = $("<div>");
  var trendingButtons = $('<br><button type=submit id="heart-' + trendingIndex + '"alt=' + videoId + ' class="btn btn-primary btn-lg"><i class="far fa-heart"></i></button> <button type=submit class="btn btn-danger btn-lg"><i class="fa fa-frown"></i></button><br><br>');
  var createTrendingIFrame = $('<iframe width="500" height="315" src="https://www.youtube.com/embed/' + videoId + ' "frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
  // adding created elements to html
  trendingVideosDiv.append(trendingButtons);
  trendingVideosDiv.prepend(createTrendingIFrame);
  $("#trending-videos").append(trendingVideosDiv);
  // variable for our unique id values
  var textId = "#heart-" + trendingIndex
  // on click of specific heart button for each video run this function 
  $(textId).on("click", function (event) {
    event.preventDefault();
    // grab the alt from this specific video and then push it to firebase
    var likedVideos = ($(this).attr("alt"));
    database.ref('liked').push({
      videoId: likedVideos,
      type: "liked"
    });
    // no longer used but saving alts from liked videos into chosenvariable varibale in case we dont need database
    chosenVideos.push(likedVideos);
  })

  // iterate the index up 1
  trendingIndex++

});

// setting a index that will count so we can iterate and assign unique ids to each video. starts at 4 because we are calling 4 videos on each trending and hotel. trending already used ids 0-3. 
var hotelIndex = 4;
// refing the hotel child in firebase
database.ref('hotel').on("child_added", function (childSnapshot) {
// grabbing the videoids from firebase and dynamically creating elements then appending to hmtl
  var videoId = childSnapshot.val().videoId;
  // creaiton of elements
  var hotelVideosDiv = $("<div>");
  var hotelButtons = $('<br><button type=submit id="heart-' + hotelIndex + '"alt=' + videoId + ' class="btn btn-primary btn-lg"><i class="far fa-heart"></i></button> <button type=submit class="btn btn-danger btn-lg"><i class="fa fa-frown"></i></button><br><br>');
  var createHotelIFrame = $('<iframe width="500" height="315" src="https://www.youtube.com/embed/' + videoId + ' "frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
  // adding created elements to html
  hotelVideosDiv.append(hotelButtons);
  hotelVideosDiv.prepend(createHotelIFrame);
  $("#hotel-videos").append(hotelVideosDiv);
  // variable for our unique id values
  var textId = "#heart-" + hotelIndex
  // on click of specific heart button for each video run this function 
  $(textId).on("click", function (event) {
    event.preventDefault();
    // grab the alt from this specific video and then push it to firebase
    var likedVideos = ($(this).attr("alt"));
    database.ref('liked').push({
      videoId: likedVideos,
      type: "liked"
    });
    // no longer used but saving alts from liked videos into chosenvariable varibale in case we dont need database
    chosenVideos.push(likedVideos);
  })
  // iterate the index up 1
  hotelIndex++
})
// ref database for liked videos
database.ref('liked').on("child_added", function (childSnapshot) {
  // grab video id from each child in liked
  var videoId = childSnapshot.val().videoId;
  // create elements for each one
  var likedVideosDiv = $("<div>");
  var createHotelIFrame = $('<iframe class="mr-1" width="340" height="215" src="https://www.youtube.com/embed/' + videoId + ' "frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><br>');
  // add elements to html
  likedVideosDiv.prepend(createHotelIFrame);
  $("#most-liked").append(likedVideosDiv);

})
// perhaps future used array of all the chosen videos.
var chosenVideos = [];

// user input validation to letters only
$("#searchInput").keyup(function(e) {
  // regex only allowing letters
  var regex = /^[a-zA-Z]+$/;
  // Anything enter thats not a letter will console log invalid
  if (regex.test(this.value) !== true)
  //alert if not true
  console.log("Invalid Input");

  // replaces the specific invalid input with nothing so basically just deletes it
    this.value = this.value.replace(/[^a-zA-Z]+/, '');
});







