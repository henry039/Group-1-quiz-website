
// document.getElementById("question").style.display = "block";
// document.getElementById("results").style.display = "none";

// function alert1() {
//     document.getElementById("question").style.display = "none";
//     document.getElementById("results").style.display = "block";
// }

// setTimeout(alert1, 3000);

// document.getElementById("aButton").onclick = function reload () {
//     location.reload();
// }

let totalPlayers = 10;

//====================================================================================
// Socket Stuff
//====================================================================================

//make websockets connection to server
let socket = io.connect('http://localhost:3000');

//query DOM for socket.io
let submitButton = document.getElementById('submitAnswerBtn');
let counter = document.getElementById('counter');

//emit events
submitButton.addEventListener('click', function() {
    socket.emit('chat', 0);
})

//listen for events (used for counter)
let counterStore = 0;
socket.on('chat', function(data) {
    counterStore++;
    counter.innerHTML += '<li>' + counterStore + '/' + totalPlayers + '</li>'
});

//====================================================================================
// Database Stuff
//====================================================================================

//function to create an array with the questions and answers in an object.
function questionLoop(data){
    let arr = [];
    for(let i = 0; i < data.length; i++) {
        let currentQuestion = data[i].question
        let outputObj = {
            Question: currentQuestion,
            Answers: []
        }
        arr.push(outputObj);
        for(let j = 0; j < (data[i].answers).length; j++) {
            outputObj.Answers.push(data[i].answers[j].answer);
        }
    }        
    console.log(arr);
    return arr;
}

$(function(){
    axios.post('/game', {
    }).then((result) => {
        questionLoop(result.data.questions);
    }).catch((err) => {
        console.log(err);
    });
});