const socket = require('socket.io')
let axios = require('axios')

// module.exports = function (server) {
    // configs
    // let io = socket(server);

    // temp storage section
    let contender = [
        // prevent repeat here
        // {'handleName' : 'soket.id'}
    ];
    let contenderResult = [
        // {
        //     'socket.id': [
        //         'correct', 'wrong', .....
        //     ]
        // }
    ]
    let totalPlayers = () => { return contender.length };
    let counter_answering = 0;
    let counter_current_questions = 0;
    let question_set;

    // function section
    function fetchDB() {
        axios.post('/game').then(
            data => { 
                // question_set = questionLoop(data)
                console.log(data)
            }
        ).catch(err => console.log(err.msg))
    }
    function questionLoop() {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let currentQuestion = data[i].question
            let outputObj = {
                Question: currentQuestion,
                Answers: []
            }
            arr.push(outputObj);
            for (let j = 0; j < (data[i].answers).length; j++) {
                outputObj.Answers.push(data[i].answers[j].answer);
            }
        }
        console.log(arr);
        return arr;
    }
    function contender_stay_or_leave() { }
    function mixed_options() { }
    function check_answer() { }
    function counter_handler() { }
    fetchDB()
    // setTimeout(()=>{
    //     // console.log(question_set)
    // },1500)
    // io section
    // io.on('connection', function (socket) {
    //     console.log('made socket connection', socket.id);
        // socket.on('chat', function () {
        //     counter_answering++;
        //     console.log(counter_answering);
        //     io.sockets.emit('chat', counter_answering);
        // });
        // socket.on('ready_to_next_question', () => {
        //     data = 0;
        // })
    // });
// }