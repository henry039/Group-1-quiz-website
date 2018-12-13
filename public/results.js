let socket = io.connect('http://localhost:3000');
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
        labels: ["player1", "player2", "player3", "player4"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 2, 2, 1],
        }]
    },

    // Configuration options go here
    options: {}
});
socket.on('overall data', overall_results=>{
    console.log(overall_results)
})