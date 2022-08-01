//Describe all variables in object
var onscreen = {
    //Holds top score element
     topscoreEL : document.getElementById("topscore"),
     //Holds time element
     timeEL : document.getElementById("timekeep"),
     introductionEL : document.getElementById("introduction"),
     //Next button
     nextquestionbutton :document.getElementById("nextquestion"),
     //Start button
     startbutton:document.getElementById("startquiz"),
     //Represents the quiz and answer page page
     quizEL : document.getElementById("quiz"),
     //Represents entire answers list
     allanswers:document.getElementById("allanswerstotal"),
     //Questions and possible answers
     questionEL : document.getElementById("question"),
     answer1EL : document.getElementById("answer1"),
     answer2EL : document.getElementById("answer2"),
     answer3EL : document.getElementById("answer3"),
     answer4EL : document.getElementById("answer4"),
     // Tells you if you got it right or wrong 
     answercheck : document.getElementById("correctorwrong"),
     //Represents score tally page 
     finalscorelogEL : document.getElementById("finalscore"),
     //Represents users final score
     userscore : document.getElementById("score"),
     //Sends score to storage and gets us to highscore page
     submissionbutton : document.getElementById("submission"),
     //Input for user name
     username : document.getElementById("fname"),
     //Highscore page
     highestscores : document.getElementById("highestscores"),
     //List of topscores
     Theelite: document.getElementById("topscoress"),
     //Takes you back to intro page
     restartbutton:document.getElementById("restart"),
     //Clears storage of all scores
     clearscoresbutton:document.getElementById("clearscores")
}

//Assigning all empty variables and clicks tha trigger beginning and next question buttons.
var questionindex 
questionindex=0
var questionsanswered
questionsanswered = 0
var totalcorrect
totalcorrect=0
onscreen.startbutton.addEventListener("click", startquiz);
onscreen.nextquestionbutton.addEventListener("click", () => {
    questionindex++;
    if (questionindex < questions.length) {
        onscreen.allanswers.classList.remove('hide')
        populatequestion();
    } else {
        
        Endofgame();
    }
    }
)
onscreen.submissionbutton.addEventListener("click",function(event){ 
    submitentry(event)

    
}
)

// onscreen.submissionbutton.addEventListener("click", tolocalstorage)
onscreen.restartbutton.addEventListener("click", Doitagain)




//These check all the answers with click event listener.
onscreen.answer1EL.addEventListener("click", Answerone);
onscreen.answer2EL.addEventListener("click", Answertwo);
onscreen.answer3EL.addEventListener("click", Answerthree);
onscreen.answer4EL.addEventListener("click", Answerfour);

var timeLeft = 75

//Timer
function countdown() {

    onscreen.timeEL.textContent= 'Remaining time: '+ timeLeft ;

    var timeInterval = setInterval(function () {
    
      timeLeft--;
      
      onscreen.timeEL.textContent= 'Remaining time: '+ timeLeft ;

      if(timeLeft === 0 || timeLeft < 0) {
        clearInterval(timeInterval)
            Endofgame();
      }
    },1000);
  }

// Function: Everytime the button is pressed the class of the next section is changed to none and current one to hide
//This button also starts the timer.
//Start Button
function startquiz(){ 
    timeLeft = 75
    countdown()
    onscreen.introductionEL.classList.add("hide")
    onscreen.quizEL.classList.remove("hide")
    setquestionsandanswers()
    questionindex=0
    onscreen.username=" ";

    

};








//function to replace content with questions and answers
function populatequestion() {
    onscreen.questionEL.innerHTML = questions[questionindex].question;
    onscreen.answer1EL.textContent = questions[questionindex].answers[0];
    onscreen.answer2EL.textContent = questions[questionindex].answers[1];
    onscreen.answer3EL.textContent = questions[questionindex].answers[2];
    onscreen.answer4EL.textContent = questions[questionindex].answers[3];
}



//This calls cunction everytime it needs to be used
function setquestionsandanswers(){
    populatequestion();

    }





//Questions
const questions = [ 
    {
        // question 0
        question: "Commonly used data types do NOT include:",
        answers: ["strings","booleans", "alerts" ,"numbers"],
        correctAnswer: "strings"
    },
    {
        // question 1
        question: "Which company developed JavaScript?",
        answers: ["Microsoft","Google", "Apple" ,"Netscape"],
        correctAnswer: "Netscape"
    },
    {
        // question 2
        question: "Which is a looping structure in JavaScript",
        answers: ["flex","of", "for" ,"when"],
        correctAnswer: "for"
    },
    {
        // question 3
        question: "Which is a type of Pop up box available in JavaScript",
        answers: ["cube","inverse", "rush" ,"prompt"],
        correctAnswer: "prompt"
    },

]






//Check if wrong or right,if wrong deduct time, if right add point
function checkAnswer(answer) {
    console.log("Checking",checkAnswer)
    if (questions[questionindex].correctAnswer === questions[questionindex].answers[answer]) {
        totalcorrect++
        onscreen.answercheck.classList.remove('hide')
        onscreen.answercheck.textContent = "Correct!";
        onscreen.allanswers.classList.add('hide')
    } else {
        timeLeft -= 10;
        onscreen.timeEL.textContent = timeLeft;
        onscreen.answercheck.classList.remove('hide')
        onscreen.answercheck.textContent = "Incorrect"
    }
}

//Asigns the checking function to all individual button
function Answerone() {checkAnswer(0); }

function Answertwo() {checkAnswer(1); }

function Answerthree(){checkAnswer(2); }

function Answerfour() {checkAnswer(3); }



//Log final score 
//Compare score with others and log into topscores
function submitentry(event){
    event.preventDefault()
    onscreen.finalscorelogEL.classList.add("hide")
    onscreen.highestscores.classList.remove("hide")
    var loggedhighscores = localStorage.getItem("high scores");
    var loggedscore;
    var mainuser=document.querySelector("#fname").value

    var userScore = {
        initials: mainuser,
        yourscore: totalcorrect
    };

    if (loggedhighscores === null) {
        loggedscore = [];
    } else {
        loggedscore = JSON.parse(loggedhighscores)
    }

    console.log(userScore);
    loggedscore.push(userScore);


   
    // Turns everything into strings
    var loggedscoreString = JSON.stringify(loggedscore);
    window.localStorage.setItem("high scores", loggedscoreString);
    allhighscores()
    

}

//Pulling scores from local storage as strings and then putting them on my highscore board.


function allhighscores(){
    

    var stringedhighscores = localStorage.getItem("high scores");

//For s stored scores
if(stringedhighscores === null){
    return;
}


var savedhighscores = JSON.parse(stringedhighscores)
console.log("HERE",savedhighscores)

organizescores();

function organizescores (){


    //Bubbler to organize scores from highest to lowest
    
    for(var i = 0; i < savedhighscores.length; i++){
       
      // Last i elements are already in place 
      for(var j = 0; j < ( savedhighscores.length - i -1 ); j++){
         
        // Checking if the item at present iteration
        // is greater than the next iteration
        if(savedhighscores[j].yourscore < savedhighscores[j+1].yourscore){
           
          // If the condition is true then swap them
          var temp = savedhighscores[j]
          savedhighscores[j] = savedhighscores[j + 1]
          savedhighscores[j+1] = temp
        }
      }
    }
};


onscreen.topscoreEL.innerHTML = "The Highscore is " + savedhighscores[0].yourscore

onscreen.Theelite.innerHTML=""

for (var all=0; all < savedhighscores.length && all < 5 ; all++) {
    var  newesthighscores= document.createElement("li");
    newesthighscores.innerHTML = savedhighscores[all].initials + "= " + savedhighscores[all].yourscore;
    onscreen.Theelite.appendChild(newesthighscores);


}



}



//To Start over
function Doitagain(){
    onscreen.highestscores.classList.add("hide")
    onscreen.introductionEL.classList.remove("hide")
    questionindex = 0
    totalcorrect = 0
    onscreen.allanswers.classList.remove('hide')
    onscreen.answercheck.classList.add('hide')
    

}





//Ends the quiz and gets us to the input initial and show score page.

function Endofgame(){
    onscreen.userscore.innerHTML= totalcorrect
    onscreen.finalscorelogEL.classList.remove("hide")
    onscreen.quizEL.classList.add("hide")
    timeLeft=0
    onscreen.timeEL.classList.display="none"

    
    

}

