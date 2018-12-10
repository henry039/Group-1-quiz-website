const data = require('../dummy_quiz.json')

document.getElementById("question1").style.display = "block";
document.getElementById("results1").style.display = "none";

function alert1() {
    document.getElementById("question1").style.display = "none";
    document.getElementById("results1").style.display = "block";
}
console.log(data)
setTimeout(alert1, 3000);

document.getElementById("aButton").onclick = function reload () {
    location.reload();
}