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

  function clearDatabase() {
    database.ref().set({
    hotelVideoResults: [],
    trendingVideoResults: []
    
  })
    }

    clearDatabase();

    $("#trending-videos").empty();
    $("#hotel-videos").empty();


  event.preventDefault();

  var searchTerm = $("#searchInput").val().trim();

  console.log(searchTerm);

  var trendingQueryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=things+to+do+in" + searchTerm + "&type=video&videoCaption=closedCaption&maxResults=5&key=AIzaSyDkyhWrY5vrU3x1xIKmzlyjaKX3mBGKTJ8";

  $.ajax({
    url: trendingQueryURL,
    method: "GET"
  }).then(function (response) {

    var results = response.items;

    for (var i = 0; i < results.length; i++) {

      var trendingVideoResults = response.items[i].id.videoId;

      database.ref().push({
        videoId: trendingVideoResults,
        type: "trending"
      });
    }
    
  });


  var hotelQueryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=hotel+in" + searchTerm + "&type=video&videoCaption=closedCaption&maxResults=5&key=AIzaSyDkyhWrY5vrU3x1xIKmzlyjaKX3mBGKTJ8";

  $.ajax({
    url: hotelQueryURL,
    method: "GET"
  }).then(function (response) {

    var results = response.items;

    for (var i = 0; i < results.length; i++) {

      var hotelVideoResults = response.items[i].id.videoId;

      database.ref().push({
        videoId: hotelVideoResults,
        type: "hotel"
      });
    }
    
  });



  
});

var chosenVideos = [];

database.ref().on("child_added", function(childSnapshot){

    var videoId = childSnapshot.val().videoId;


    function makeVideos() {


      if (childSnapshot.val().type === "trending"){

              var trendingVideosDiv = $("<div>");

              var trendingButtons = $("<br><button type=submit class='btn btn-primary btn-lg'><i class='far fa-heart'></i></button> <button type=submit class='btn btn-danger btn-lg'><i class='fa fa-frown'></i></button><br><br>");

              var createTrendingIFrame = $('<iframe width="500" height="315" src="https://www.youtube.com/embed/' + videoId + ' "frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');

              trendingVideosDiv.append(trendingButtons);
              trendingVideosDiv.prepend(createTrendingIFrame);
              
              $("#trending-videos").append(trendingVideosDiv);

      } else {

              var hotelVideosDiv = $("<div>");

              var hotelButtons = $("<br><button type=submit class='btn btn-primary btn-lg'><i class='far fa-heart'></i></button> <button type=submit class='btn btn-danger btn-lg'><i class='fa fa-frown'></i></button><br><br>");

              var createHotelIFrame = $('<iframe width="500" height="315" src="https://www.youtube.com/embed/' + videoId + ' "frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');

              hotelVideosDiv.append(hotelButtons);
              hotelVideosDiv.prepend(createHotelIFrame);
              
              $("#hotel-videos").append(hotelVideosDiv);
}
        
        }

makeVideos();

});









