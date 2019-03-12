$(document).ready(function(){

    //correct/wrong answer counters
    var correctAnswers = 0;
    var wrongAnswers = 0;

    var currentQuestion = 0;

    //user answers
    var notAnswered = 0;
    var answered = 0;
    var userAnswer = 0;

    //time variables
    var sec = 0;
    var time = 0;

    //Trivia Questions
    var question = [
        //Q1
        {
            question: "What is the capital of Turkey?",
            answerOptions: ["Ankara", "Istanbul", "Izmir", "Antalya"],
            answerKey: 0
        }, //Q2
        {
            question: "What is the capital of Ireland?",
            answerOptions: ["Limerick", "Dublin", "Wexford", "Waterford"],
            answerKey: 1
        }, //Q3
        {
            question: "What is the capital of Germany?",
            answerOptions: ["Hamburg", "Munich", "Frankfurt", "Berlin"],
            answerKey: 3
        }, //Q4
        {
            question: "What is the capital of India?",
            answerOptions: ["Mumbai", "New Delphi", "Ahmedabad", "Agra"],
            answerKey: 1
        }, //Q5
        {
            question: "What is the capital of Italy?",
            answerOptions: ["Florance", "Venice", "Milan", "Rome"],
            answerKey: 3
        }, //Q6
        {
            question: "What is the capital of Australia?",
            answerOptions: ["Melbourne", "Sydney", "Canberra", "Brisbane"],
            answerKey: 2
        }, //Q7
        {
            question: "What is the capital of Pakistan?",
            answerOptions: ["Islamabad", "Karachi", "Lahore", "Rawalpindi"],
            answerKey: 0
        }, //Q8
        {
            question: "What is the capital of China?",
            answerOptions: ["Shanghai", "Beijing", "Hong Kong", "Shenzhen"],
            answerKey: 1
        }, 
    ]
    var multpchoice = ["A", "B", "C", "D"]
    var audio = new Audio('assets/sound/clock-ticking.mp3');

    //messages to display for user
    var userMessages = {
        correct: "Wohoo! That's correct!",
        incorrect: "Womp Womp.. Wrong answer!",
        timeUp: "Time is up!",
        gameOver: "Game Over!"
    }

    function start (){
        //initialize everything
        $("#messages").empty();
        $("#correctAnswers").empty();
        $("#wrongAnswers").empty();
        $("#notAnswered").empty();
        
        correctAnswers = 0;
        wrongAnswers = 0;
        currentQuestion = 0;
        notAnswered = 0;

        //call function to get the first question
        startTrivia();
    }

    //Game timer
    function timer(){
        sec = 10;
        $("#timer").html("<h3>Time left: " + sec + "</h3>");
        answered = true;
        time = setInterval(timerCountDown, 1000);
        audio.play();
    }

    //Timer Count Down
    function timerCountDown(){
        sec--;
        $("#timer").html("<h3>Time left: " + sec + "</h3>");
        
        //if time is less than 1, clear the time, set answered to false and then call the answer page
        if (sec < 1) {
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }

    function answerPage(){
        $("#currentQuestion").empty();
        $(".thisChoice").empty();
        $(".question").empty();

        var rightAnswerText = question[currentQuestion].answerOptions[question[currentQuestion].answerKey];
        var rightAnswerIndex = question[currentQuestion].answerKey;

        //if user answer is correct
        if ((userAnswer == rightAnswerIndex) && (answered == true)){
            correctAnswers++;
            $("#message").text(userMessages.correct);
        }
        //if user answer is not correct
        else if ((userAnswer != rightAnswerIndex) && (answered == true)){
            wrongAnswers++;
            $("#message").text(userMessages.incorrect);
            $("#correctedAnswer").text("The correct answer is: " + rightAnswerText);

        }
        //if user did not answer => notAnswered
        else {
            notAnswered++;
            $("#message").text(userMessages.timeUp);
            $("#correctedAnswer").text("The correct answer is: " + rightAnswerText);
            answered = true;
        }

        if (currentQuestion == (question.length-1)) {
            setTimeout(scoreBoard, 2000);
        }
        else {
            currentQuestion++;
            setTimeout(startTrivia, 2000);
        }
    }

    //start the trivia
    function startTrivia() {
        $("#message").empty();
        $("#correctedAnswer").empty();
        answered = true;

        //display the question
        $(".question").html("<h2>" + question[currentQuestion].question + "</h2>");
        
        //display the answer options
        for (var i = 0; i < 4; i++) {
            var choices = $("<div>");
            choices.html("<strong>" + multpchoice[i] + ")</strong> " + question[currentQuestion].answerOptions[i]);
            choices.attr({ "data-index": i });
            choices.addClass("thisChoice");
            $(".answerList").append(choices);
        }
        // start the timer
        timer();

        //if the user clicks an answer, clear the timer, save the user selection and call answerPage to display if it's right/wrong
        $(".thisChoice").on("click", function () {
            userAnswer = $(this).data("index");
            clearInterval(time);
            answerPage();
        });
    }
    //after game ends, show the scoreboard
    function scoreBoard() {
        //clear values
        $("#timer").empty();
        $("#message").empty();
        $("#correctedAnswer").empty();

        //game over message
        $("#message").text(messages.gameOver);

        //show player statistics
        $("#correctAnswers").text("Correct Answers: " + correctAnswers);
        $("#wrongAnswers").text("Wrong Answers: " + wrongAnswers);
        $("#notAnswered").text("Not Answered: " + notAnswered);
        
        //reset the game 
        $("#startAgainButton").addClass("reset");
        $("#startAgainButton").show();
        $("#startAgainButton").text("Start Over?");
    }

    //start button 
    $("#startButton").on("click", function () {
        $(this).hide();
        start();
    });
    //reset button
    $("#startAgainButton").on("click", function () {
        $(this).hide();
        start();
    });

});
