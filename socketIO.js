const socket = require('socket.io');
const fs = require('fs');

let dummyDataJSON = fs.readFileSync('./dummy_quiz.json');
let parsedDummyDataJSON = JSON.parse(dummyDataJSON);


module.exports = function (server) {
    // configs
    let io = socket(server);

    // temp storage section
    let contender = [
        // prevent repeat here
        // {'handleName' : 'socket.id'}
    ];
    let contenderResult = [
        // {
        //     'socket.id': [
        //         'correct', 'wrong', .....
        //     ]
        // }
    ]
    // let totalPlayers = ()=>{return contender.length};
    let totalPlayers = 2;
    let counter_answering = 0;
    let counter_nextQuestion = 0;
    let counter_current_questions = 0;

    // function section
    function fetchDB() { }
    function contender_stay_or_leave() { }
    function mixed_options() { }
    function check_answer() { }
    function render_html() { }
    function counter_handler() { }

    let quizData = questionLoop(parsedDummyDataJSON)
    // console.log('this is quizdata ' +  quizData[1].Question)
    function questionLoop(data) {
        console.log(data);
        let arr = [];
        for (let i = 0; i < data.questions.length; i++) {
            let currentQuestion = data.questions[i].question;
            let outputObj = {
                Question: currentQuestion,
                Answers: []
            }
            arr.push(outputObj);
            for (let j = 0; j < (data.questions[i].answers).length; j++) {
                outputObj.Answers.push(data.questions[i].answers[j].answer);
            }
        }
        // console.log(arr);
        return arr;
    }

    console.log(quizData[counter_current_questions])
    // io section
    io.on('connection', function (socket) {
        console.log('made socket connection', socket.id);
        socket.on('aMessage', function () {
            // console.log(data);
            counter_nextQuestion = 0;
            counter_answering++;
            let dataObj = {
                PlayersAnswered: counter_answering,
                TotalPlayers: totalPlayers
            };
            // console.log(counter_answering);
            io.sockets.emit('aMessage', dataObj);
            // console.log(dataObj);
        });
        socket.on('next question button', () => {
            counter_nextQuestion++;
            counter_answering = 0;
            let dataObj = {
                PlayersAnswered: counter_nextQuestion,
                TotalPlayers: totalPlayers
            };
            console.log(counter_answering);
            io.sockets.emit('next question button', dataObj);
            // console.log(dataObj);
        });
        socket.on('send new question', (data) => {
            console.log(data);
            io.sockets.emit('send new question', quizData[counter_current_questions])
            counter_current_questions++;
        });
    });


}