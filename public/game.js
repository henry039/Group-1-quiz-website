//====================================================================================
// Socket Stuff
//====================================================================================

//make websockets connection to server
// pin config
// let socket = io.connect(`http://localhost:3000/game/${pin}`)
let socket = io.connect('http://localhost:3000');
// socket.emit('send new question')

//query DOM for socket.io
let submitButton = document.getElementById('submitAnswerBtn');
let qButton = document.getElementById('nextQuestion');
let counter = document.getElementById('counter');

//emit events
// answer picker
// option_pick.addEventListener('click',()=>{
//     option_pick.style.borderColor = 'transparent',
//     option_pick.className = 'result'
// });
let config = { attributes: true, childList: true, subtree: true };
let cb = (mutationListe, observer) => {
    for (mutation in mutationListe) {
        if (mutation.type == 'subtree') {
            console.log('good to know that');
        } else {
            [...document.getElementsByClassName('options')].forEach((ele, index) => {
                ele.onclick = () => {
                    if (ele.className == 'options active') {
                        ele.className = 'options'
                        ele.style.backgroundColor = 'transparent'
                    } else {
                        ele.className = 'options active'
                        ele.style.backgroundColor = 'pink'
                    }
                }
            });
        }
    }
}
let observer = new MutationObserver(cb);
observer.observe($('#question')[0], config);
//counter and results
submitButton.addEventListener('click', function() {
    let final_answer = document.getElementsByClassName('active')[0].innerText.slice(0, -1);
    console.log(final_answer)
    socket.emit('submit answer', {
        name : socket.id,
        payload : final_answer
    });
    document.getElementById("submitAnswerBtn").disabled = true;
})
//next question
qButton.addEventListener('click', function() {
    socket.emit('next question button');
    document.getElementById("nextQuestion").disabled = true;
});



//listen for events (used for counter)
// let everyoneSubmitted = false;

//counter and results returned data
socket.on('submit answer', function(data) {
    if (data.PlayersAnswered < data.TotalPlayers) {
        counter.innerHTML = data.PlayersAnswered + '/' + data.TotalPlayers;
    } else {
        counter.innerHTML = data.PlayersAnswered + '/' + data.TotalPlayers + ' All players submitted';
        if(data.CorrectOrNot){
            $('#results').append('<h2>Correct</h2>')
        }else{
            $('#results').append('<h2>Wrong</h2>')
        }
        switch2();
    }
});
//next question returned data
socket.on('next question button', function(data) {
    if (data.PlayersAnswered < data.TotalPlayers) {
        counter.innerHTML = data.PlayersAnswered + '/' + data.TotalPlayers;
    } else {
        counter.innerHTML = data.PlayersAnswered + '/' + data.TotalPlayers + ' All players ready';
        socket.emit('send new question')
        switch3();
    }
});

// render next question
socket.on('send new question', data=>{
    $('#question').html(question(data))
})
// document.getElementById("aButton").onclick = function reload () {
//     $('#notes').html(question({data}))
//     // location.reload();
// }
let question = Handlebars.compile(`
    <div>
        <div id="question">
            <h1>{{Question}}</h1>
        </div>
        {{#each Answers}}
        <div class="options">
            <h1>{{this}}</h1>
        </div>
        {{/each}}
    </div>
`)

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
