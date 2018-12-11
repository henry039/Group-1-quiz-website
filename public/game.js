
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



function questionLoop(data){
    let arr = [];
    for(let i = 0; i < data.length; i++) {
        arr.push(data[i].question);
        for(let j = 0; j < (data[i].answers).length; j++) {
            arr.push(data[i].answers[j]);
        }
    }        
    console.log(arr);
    return arr;
}

$(function(){
    axios.post('/game', {
    }).then((result) => {
        questionLoop(result.data.questions);
    }).catch((err) => {
        console.log(err);
    });
})