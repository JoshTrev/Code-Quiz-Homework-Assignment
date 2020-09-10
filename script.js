//Variables

var questionPrompt = [
    "Commonly used data types DO NOT include:",
    "The condition in an If / Else statement is enclosed within:",
    "Arrays in JavaScript can be used to store:",
    "String values must be enclosed within _____ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:"
];

var correctChoice = [
    "3",
    "3",
    "4",
    "3",
    "4",

];

var choice1 = [
    "1. Strings",
    "1. Quotes",
    "1. Only Numbers and Strings",
    "1. Commas",
    "1. JavaScript",
];
var choice2 = [
    "2. Booleans",
    "2. Curly Brackets",
    "2. Only Other Arrays",
    "2. Curly Brackets",
    "2. Terminal/Bash",
];
var choice3 = [
    "3. Alerts",
    "3. Parentheses",
    "3. Only Booleans",
    "3. Quotes",
    "3. For Loops",
];
var choice4 = [
    "4. Numbers",
    "4. Square Brackets",
    "4. All of the Above",
    "4. Parentheses",
    "4. Console.Log",
];

var currentChoice = "";

var currentQuestionNumber = 0;

var timeLeft = 60;

//Setting Up Buttons

$("#question").text(questionPrompt[0]);

$("#choice1").text(choice1[0]);
$("#choice2").text(choice2[0]);
$("#choice3").text(choice3[0]);
$("#choice4").text(choice4[0]);

// Timer Count Down Function

function countDown() {
    var timeInterval = setInterval(function(){
        $("#timer").text(timeLeft - 1);
        timeLeft--;

        if (timeLeft === 0) {
            SetScoreToLocalStorage();
            window.location.href = "Finished.html";
            clearInterval(timeInterval);
            GetScoreFromLocalStorage();
        }
    }, 1000);
}

countDown();

//Button Click Functions

$("#choice1").on("click", function(){
    currentChoice = "1";
    CheckQuestion();
});

$("#choice2").on("click", function(){
    currentChoice = "2";
    CheckQuestion();
});

$("#choice3").on("click", function(){
    currentChoice = "3";
    CheckQuestion();
});

$("#choice4").on("click", function(){
    currentChoice = "4";
    CheckQuestion();
});

function CheckQuestion(){
    if (currentChoice == correctChoice[currentQuestionNumber]){
        $("#response").text("Correct!");
        NextQuestion();
    }

    else{
        $("#response").text("Wrong!");
        NextQuestion();

        timeLeft = timeLeft - 5;
    }
}

function NextQuestion(){
    currentQuestionNumber++;

    if (currentQuestionNumber < 5){
        $("#question").text(questionPrompt[currentQuestionNumber]);

        $("#choice1").text(choice1[currentQuestionNumber]);
        $("#choice2").text(choice2[currentQuestionNumber]);
        $("#choice3").text(choice3[currentQuestionNumber]);
        $("#choice4").text(choice4[currentQuestionNumber]);
    }

    else {
        SetScoreToLocalStorage();
        window.location.href = "Finished.html";
        GetScoreFromLocalStorage();
    }
}

function SetScoreToLocalStorage(){
    localStorage.setItem("timeLeft", timeLeft);
}

//Script for Finished.html page

function GetScoreFromLocalStorage(){
    var newHighScore = localStorage.getItem("timeLeft");
    $("#highscore").text("Your Score: " + newHighScore);
}

$("#submitInitialsButton").on("click", function(event){
    event.preventDefault();

    var newHighScore = localStorage.getItem("timeLeft");
    
    var newInitials = document.querySelector("#initialsHere").value;

    newInitialsDiv = $("<div>");
    newInitialsDiv.addClass("card-header");
    newInitialsH3 = $("<h3>");
    
    $("#initials").prepend(newInitialsDiv);
    newInitialsDiv.prepend(newInitialsH3);
    
    newInitialsH3.text(newInitials + ": " + newHighScore);

    //Adding to local storage

    var highScoresArray = JSON.parse(localStorage.getItem("highScoresArray"));
    var highScoresInitialsArray = JSON.parse(localStorage.getItem("highScoresInitialsArray"));

    if(highScoresArray == null){
        var highScoresArray = []; 
    }

    if(highScoresInitialsArray == null){
        var highScoresInitialsArray = []; 
    }

    highScoresArray.push(newHighScore);
    highScoresInitialsArray.push(newInitials);

    localStorage.setItem("highScoresArray", JSON.stringify(highScoresArray));
    localStorage.setItem("highScoresInitialsArray", JSON.stringify(highScoresInitialsArray));
});

function InstantiateHighScoreList(){
    var newHighScoresArray = JSON.parse(localStorage.getItem("highScoresArray"));
    var newhighScoresInitialsArray = JSON.parse(localStorage.getItem("highScoresInitialsArray"));

    for (i = 0; i < newHighScoresArray.length; i++){
        newInitialsDiv = $("<div>");
        newInitialsDiv.addClass("card-header");
        newInitialsH3 = $("<h3>");
    
        $("#initials").prepend(newInitialsDiv);
        newInitialsDiv.prepend(newInitialsH3);
    
        newInitialsH3.text(newhighScoresInitialsArray[i] + ": " + newHighScoresArray[i]);
    }
}