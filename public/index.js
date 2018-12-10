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

$(function(){
    $('input[name=logInSubmit]').click(e=>{
        e.preventDefault();

        let loginEmail = $('input[name=login-email]').val();
        let loginPassword = $('input[name=login-password]').val();

        axios.post('/', {
            loginEmail : loginEmail,
            loginPassword : loginPassword
        })
    })

    $('input[name=signUpSubmit]').click(e=>{
        e.preventDefault();

        let signUpEmail = $('input[name=sign-up-email]').val();
        let signUpPassword = $('input[name=sign-up-password]').val();

        axios.post('/', {
            email : signUpEmail,
            password : signUpPassword
        })
    })

    $('input[name=playSubmit]').click(e=>{
        e.preventDefault();

        let playPin = $('input[name=playPin]').val();
        let playHandle = $('input[name=playHandle]').val();

        axios.post('/', {
            playPin : playPin,
            playHandle : playHandle
        })
    })
})