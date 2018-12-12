const socket = require('socket.io')

module.exports = function(server) {
    // configs
    let io = socket(server);

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
    let totalPlayers = ()=>{return contender.length};
    let counter_answering = 0;
    let counter_current_questions = 0;

    // function section
    function fetchDB(){}
    function contender_stay_or_leave(){}
    function mixed_options(){}
    function check_answer(){}  
    function render_html(){}  
    function counter_handler(){}


    // io section
    io.on('connection', function(socket) {
        console.log('made socket connection', socket.id);
        socket.on('chat', function() {
            counter_answering++;
            console.log(counter_answering);
            io.sockets.emit('chat', counter_answering);
        });
        socket.on('ready_to_next_question', () => {
            data = 0;
        })
    });
}