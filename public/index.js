const switchButton = document.getElementById("switchButton");
switchButton.onclick = function() {
    if(document.getElementById("login-form").style.display == "none") {
        document.getElementById("login-form").style.display = "block";
        document.getElementById("sign-up-form").style.display = "none";
        document.getElementById("switchButton").innerHTML = "Click to Register";
    } else {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("sign-up-form").style.display = "block";
        document.getElementById("switchButton").innerHTML = "Click to Log-in";
    }
};