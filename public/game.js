
document.getElementById("question").style.display = "block";
document.getElementById("results").style.display = "none";

function alert1() {
    document.getElementById("question").style.display = "none";
    document.getElementById("results").style.display = "block";
}

setTimeout(alert1, 3000);

document.getElementById("aButton").onclick = function reload () {
    location.reload();
}
$(function(){
    axios.post('/game', {
    }).then((result) => {
        console.log(result.data.questions);
    }).catch((err) => {
        console.log(err);
    });
})