//====================================================================================
// Socket Stuff
//====================================================================================

//make websockets connection to server
// pin config
// let socket = io.connect(`http://localhost:3000/game/${pin}`)
let socket = io.connect('http://localhost:3000');

//query DOM for socket.io
let submitButton = document.getElementById('submitAnswerBtn');
let qButton = document.getElementById('nextQuestion');
let counter = document.getElementById('counter');

//emit events
//counter and results
submitButton.addEventListener('click', function() {
    socket.emit('aMessage');
    document.getElementById("submitAnswerBtn").disabled = true;
})
//next question
qButton.addEventListener('click', function() {
    socket.emit('next question button');
    document.getElementById("nextQuestion").disabled = true;
})

//listen for events (used for counter)


let everyoneSubmitted = false;

//counter and results returned data
socket.on('aMessage', function(data) {
    // console.log(data);
    if (data.PlayersAnswered < data.TotalPlayers) {
        counter.innerHTML = data.PlayersAnswered + '/' + data.TotalPlayers;
        // console.log(data);
        // console.log(everyoneSubmitted);
    } else {
        counter.innerHTML = data.PlayersAnswered + '/' + data.TotalPlayers + ' All players submitted';
        // console.log(data);
        switch2();
        // console.log(everyoneSubmitted)
    }
});
//next question returned data
socket.on('next question button', function(data) {
    // console.log(data);
    if (data.PlayersAnswered < data.TotalPlayers) {
        counter.innerHTML = data.PlayersAnswered + '/' + data.TotalPlayers;
        // console.log(data);
        // console.log(everyoneSubmitted);
    } else {
        counter.innerHTML = data.PlayersAnswered + '/' + data.TotalPlayers + ' All players ready';
        // console.log(data);
        switch3();
        // $('#question').html(question(data.questions));
        socket.emit('send new question', 1234)
        // console.log(everyoneSubmitted)
    }
});

// document.getElementById("aButton").onclick = function reload () {
//     $('#notes').html(question({data}))
//     // location.reload();
// }
socket.on('send new question', data=>{
    console.log(typeof data);
    console.log(data);
    $('#question').html(question(data))
})
let question = Handlebars.compile(`
    <div>
        <div id="question">
            <h1>{{Question}}</h1>
        </div>
        {{#each Answers}}
        <div id="result">
            <h1>{{this}}</h1>
        </div>
        {{/each}}
    </div>
`)

let btn = document.getElementById('nextQuestion');

btn.addEventListener('click', function() {
    socket.emit('nextQuestion');
})

//====================================================================================
// HTML Stuff
//====================================================================================
//results display switch 1
function switch2(){
    document.getElementById("question").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("submitAnswerBtn").style.display = "none";
    document.getElementById("nextQuestion").style.display = "block";
}
//question display switch 2
function switch3(){
    document.getElementById("question").style.display = "block";
    document.getElementById("results").style.display = "none";
    document.getElementById("submitAnswerBtn").style.display = "block";
    document.getElementById("nextQuestion").style.display = "none";
    document.getElementById("submitAnswerBtn").disabled = false;
    document.getElementById("nextQuestion").disabled = false;
}


//====================================================================================
// Database Stuff
//====================================================================================

//function to create an array with the questions and answers in an object.
// function questionLoop(data){
    // let arr = [];
    // for(let i = 0; i < data.length; i++) {
    //     let currentQuestion = data[i].question
    //     let outputObj = {
    //         Question: currentQuestion,
    //         Answers: []
    //     }
    //     arr.push(outputObj);
    //     for(let j = 0; j < (data[i].answers).length; j++) {
    //         outputObj.Answers.push(data[i].answers[j].answer);
    //     }
    // }        
    // // console.log(arr);
    // return arr;
// }

// let QnAobj;

// $(function(){
//     axios.post('/game', {
//     }).then((result) => {
//         await (QnAobj = questionLoop(result.data.questions));
//     }).catch((err) => {
//         console.log(err);
//     });
// });