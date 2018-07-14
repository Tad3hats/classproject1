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




var chosenVideos = [];



database.ref().on("child_added", function(childSnapshot){

    var videoId = childSnapshot.val().videoResults;


    function makeVideo() {

        var createIFrame = $('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + ' "frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
        
        $("#player").append(createIFrame);
        
        }
        
makeVideo();

});



