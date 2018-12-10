
document.getElementById("question").style.display = "block";
document.getElementById("results").style.display = "none";

function alert1() {
    document.getElementById("question").style.display = "none";
    document.getElementById("results").style.display = "block";
}

setTimeout(alert1, 3000);

document.getElementById("aButton").onclick = function reload () {
    $('#notes').html(question({data}))
    // location.reload();
}

let quesetion = Handlebars.compile(`
    <div>
        <div id="question">
            <h1>{{question}}</h1>
        </div>
        {{#each answer}}
        <div id="results">
            <h1>{{result}}</h1>
        </div>
        {{/each}}
    </div>
`)

$(function(){
    axios.post('/game', {
    }).then((result) => {
        console.log(result.data.questions);
    }).catch((err) => {
        console.log(err);
    });
})