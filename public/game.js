
document.getElementById("question1").style.display = "block";
document.getElementById("results1").style.display = "none";

function alert1() {
    document.getElementById("question1").style.display = "none";
    document.getElementById("results1").style.display = "block";
}

setTimeout(alert1, 3000);
