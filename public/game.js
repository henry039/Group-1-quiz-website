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
    document.getElementById("submitAnswerBtn").disabled = true;
})

//listen for events (used for counter)
let totalPlayers = 10;
let counterStore = 0;

let everyoneSubmitted = false;

socket.on('chat', function(data) {
    counterStore = data;
    if (data < totalPlayers) {
        counter.innerHTML = data + '/' + totalPlayers
        // console.log(data);
        // console.log(everyoneSubmitted);
    } else {
        everyoneSubmitted = true;
        counter.innerHTML = data + '/' + totalPlayers + ' All players submitted'
        // console.log(data);
        switch2()
        // console.log(everyoneSubmitted)
    }
});


let btn = document.getElementById('nextQuestion');

btn.addEventListener('click', function() {
    socket.emit('nextQuestion');
})

//====================================================================================
// HTML Stuff
//====================================================================================

function switch2(){
    document.getElementById("question").style.display = "none";
    document.getElementById("results").style.display = "block";
}

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
    // console.log(arr);
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