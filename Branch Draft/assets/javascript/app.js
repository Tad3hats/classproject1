// Animal GIFs variable
var animals = ["Horse", "Pigeon", "Cat", "Dog", "Isle of Dogs", "Dragon",
"Tiger", "Cheeta", "Fox", "Fantastic Mr. Fox", "Wolf", "Turtle",
"Ninja Turtles", "Anaconda", "Octopus", "Cow", "Parrot", "Whale", "Shark",
"Aligator", "Bat", "Batman"];

// Number of GIFs one user clicks animal button
var gifsNumber = 10;
var gifRating = "PG";

// Function to create Buttons. For loop to go through Animals variable and create a button for each animal in the string. 
function createButtons(){
	for(var i = 0; i < animals.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("button");
		newButton.addClass("animal-button");
		newButton.text(animals[i]);
		$("#button-container").append(newButton);
	}
// Onclick function to display gifts. Click another button and generate new GIFs
	$(".animal-button").on("click", function(){
		$("#gif-container").empty();
		gifContainer($(this).text());
	});

}

// Function to add Buttons when submitting the new value
function addButton(show){
	if(animals.indexOf(show) === -1) {
		animals.push(show);
		$("#button-container").empty();
		createButtons();
	}
}

// Giphy API link and rating.
function gifContainer(show){
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + 
		"&api_key=SB6tz1d7V5p4d5u1Kh1oqc3jl1TXO8h7&rating=" + gifRating + "&limit=" + gifsNumber;
	$.ajax({
    url: queryURL,
    method: "GET"
    
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
      newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");


      // New image GIF 
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
    
    // Pause and play - State: Still and animated data.
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

// Add button 
$(document).ready(function(){
	createButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#animal-show").val().trim());
		$("#animal-show").val("");
	});
});