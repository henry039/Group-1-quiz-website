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
    $('form#login-form').submit(e=>{
        e.preventDefault();

        let loginEmail = $('input[name=login-email]').val();
        let loginPassword = $('input[name=login-password]').val();
        

        axios.post('/login', {
            email : loginEmail,
            password : loginPassword
        })
        .then(obj=>{
            let data = obj.data;
            if(data.redirect === true){
                window.location = data.redirectURL;
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })

    $('form#sign-up-form').submit(e=>{
        e.preventDefault();

        let signUpEmail = $('input[name=sign-up-email]').val();
        let signUpPassword = $('input[name=sign-up-password]').val();
        let signUpUsername = $('input[name=sign-up-username]').val();

        let user = {
            username: signUpUsername,
            email: signUpEmail
        }

        axios.post('/signup', {
            user: JSON.stringify(user),
            password : signUpPassword
        })
        .then(obj=>{
            let data = obj.data;
            if(data.redirect === true){
                window.location = data.redirectURL;
            }
        })
        .catch(err=>{
            console.log(err)
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