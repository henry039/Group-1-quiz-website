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
// answer picker background colour
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
    //grabs the selected answer from the DOM and saves it to final_answer
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

socket.on('submit individual answer', function(data) {
    if(data){
        $('#results').append('<h2>Correct</h2>')
    }else{
        $('#results').append('<h2>Wrong</h2>')
    }
}
);
//counter and results returned data
socket.on('submit answer', function(data) {
    if (data.PlayersAnswered < data.TotalPlayers) {
        counter.innerHTML = data.PlayersAnswered + '/' + data.TotalPlayers;
    } else {
        counter.innerHTML = data.PlayersAnswered + '/' + data.TotalPlayers + ' All players submitted';
        switch2();
    }
});

//next question returned data
socket.on('next question button', function(data) {
    if (data.PlayersAnswered < data.TotalPlayers) {
        counter.innerHTML = data.PlayersAnswered + '/' + data.TotalPlayers;
        console.log('is anybody out there?');
    } else {
        counter.innerHTML = data.PlayersAnswered + '/' + data.TotalPlayers + ' All players ready';
        console.log('go to next q'+data.PlayersAnswered)
        switch3();
    }
});
socket.on('send new question2', data=>{
    socket.emit('send new question', data)
})


socket.on('send new question1', (data)=>{
    console.log('from game ' + data);
    $('#question').html(question(data));
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
