var questions = [
    {question: "Pick a place to stay", choices: ["Hotel", "Hostel", "Campground", "Cabin", "Oceanfront Villa", "Tree House"], answer: ""},
    {question: "How will you get there?", choices: ["Airplane", "Car", "Train", "Boat"], answer: ""},
    {question: "What's on the agenda?", choices: ["Lot's of outdoor activities", "Touristy Stuff", "Relax Indoors", "Be a Beach Bum"], answer: ""},
    {question: "Who will you go with?", choices: ["Your Family", "Your Friends", "Your Partner", "By yourself"], answer: ""},
    {question: "Pick an afternoon activities", choices: ["Drinking", "Sailing", "Cooking Class", "Swimming"], answer: ""},
    {question: "What ocean would you like to visit?", choices: ["Indian Ocean", "Atlantic Ocean", "Pacific Ocean", "Antartic Ocean"], answer: ""},
    {question: "Choose a Dinner", choices: ["Arepas", "Pasta", "Chicken Curry", "Sushi"], ansewr: "Dumplings"},
    {question: "Another Question", choices: ["Hydrogen", "Lythium", "Oxygen", "Nitrogen"], answer: ""}, 
    {question: "Another Question 2", choices: ["15,245 feet", "28,469 feet", "54,411 feet", "35,814 feet"], answer: ""},
    {question: "Another Question 3", choices: ["Purple", "Pink", "Yellow", "Black"], answer: ""}, 
];
    
    // var secRemain = 60;
  
      var intervalId;
  
   
     // bellow function will show the trivia questions and will decrement the counter by 1 second.
      function begin() {
    
        intervalId = setInterval(timesUp, 1000);
  
    
        $("#question0").show();
        $("#question1").show();
        $("#question2").show();
        $("#question3").show();
        $("#question4").show();
        $("#question5").show();
        $("#question6").show();
        $("#question7").show();
        $("#question8").show();
        $("#question9").show();
        $("#startButton").hide();
        $("#doneButton").show();
  
        // For loop to go through all the questions 
        for(var j=0; j<questions.length; j++ ) {
          var question = questions[j];
          var newQues = $("<p><h3><u>" + question.question + "</u></h3>");
  
          newQues.appendTo($("#question"+j));
  
        // For loop that will look at each question's answer
          for(var i=0; i<question.choices.length; i++){
            //Create the answer radio buttons
          var answerButton = $("<input type='radio'>");
            answerButton
            .attr("name", "fieldName" + j)
            .attr("value", question.choices[i])
            .addClass("text");
  
            answerButton.appendTo($("#question"+j));
            answerButton.after(question.choices[i]);
          }
        }
      }
  
     // Show time decreasing and once time is up, hide question and show all done results.
      function timesUp() {
  
        secRemain--;
  
        $("#show-number").html("<h2> Time Remaining: " + secRemain + " Seconds </h2>");
  
        if (secRemain <= 0) {
          stop();
          hideQuestion();
          showAllDone();
        }
      }
  
     // the below function is called when time is up:

      function hideQuestion() {
        $("#question0").hide();
        $("#question1").hide();
        $("#question2").hide();
        $("#question3").hide();
        $("#question4").hide();
        $("#question5").hide();
        $("#question6").hide();
        $("#question7").hide();
        $("#question8").hide();
        $("#question9").hide();
      }
      
      // the below will hide the results:
      function hideAnswer() {
        $("#correctAnswer").hide();
        $("#incorrectAnswer").hide();
        $("#unanswered").hide();
      }
  
      // The below function will invoke the results of the Trivia. 
      function showAllDone() {
  
        $("#show-number").hide();
  
        $("#log").text("All Done!");
        $("#correctAnswer").show();
        $("#incorrectAnswer").show();
        $("#unanswered").show();
        $("#doneButton").hide();
  
        var unanswered = 0;
        var correctAnswer = 0;
        var incorrectAnswer = 0;
  
        // For loop through all the questions in the questions array, get the sected question input in the radio button
        for(var i=0; i<questions.length; i++) {
          var selected = $("input[type='radio'][name='fieldName" + i + "']:checked");
          if(selected.length > 0 ) {
              // compare the player's selected answer with the correct answer.
              if(selected.val() === questions[i].answer) {
                // if player selects the correct answer, increase the correctAnswer counter by 1
                correctAnswer++;
              } else {
                // else, player selects the incorrect answer, increase the incorrectAnswer by 1. 
                incorrectAnswer++;
              }
          } else {
            // or if/else none of the radio button is selected; increase the unanswered counter
            unanswered++;
          }
        }
  
        // Display the number of correct, incorrect, unswered questions on the page:
        $("#correctAnswer").html("<span> Correct Answers: " + correctAnswer + "</span>");
        $("#incorrectAnswer").html("<span> Incorrect Answers: " + incorrectAnswer + "</span>");
        $("#unanswered").html("<span> Unanswered: " + unanswered + "</span>");
  
      }
  
     // Function to start the game, hide questions and answers, show the start button with ability to invoke the begin function if the user clicks the button.
      function start() {
        hideQuestion();
        hideAnswer();
        $("#doneButton").hide();
        $("#startButton").click(begin);
        $("#doneButton").click(stop);
      }
  
      // stop function to stop the game, hide the qustions, and show results.
      function stop() {
  
        clearInterval(intervalId);
        hideQuestion();
        showAllDone();
      }
      
      $(document).ready(function() {
        // when document is ready, call the start method
        start();
  
      })