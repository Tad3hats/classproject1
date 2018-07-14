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



$("#go-button").on("click", function (event) {
  event.preventDefault();

  var searchTerm = $("#searchInput").val().trim();

  console.log(searchTerm);

  var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + searchTerm + "&type=video&videoCaption=closedCaption&key=AIzaSyDkyhWrY5vrU3x1xIKmzlyjaKX3mBGKTJ8";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var results = response.items;

    for (var i = 0; i < results.length; i++) {

      var videoResults = response.items[i].id.videoId;

      database.ref().push({
        videoResults: videoResults,
      });
    }
  });
});









