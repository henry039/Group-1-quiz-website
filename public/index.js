let socket = io.connect('http://localhost:3000');

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
        .then(()=>{
            console.log('done')
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
        .then(()=>{
            console.log('done')
        })
        .catch(err=>{
            console.log(err)
        })
    })

    $('input[name=playSubmit]').click(e=>{
        e.preventDefault();

        let playPin = $('input[name=playPin]').val();
        let playHandle = $('input[name=playHandle]').val();

        // render next question 
        // socket.emit('send new question', 1234);

        axios.post('/', {
            playPin : playPin,
            playHandle : playHandle
        })
    })
})

//====================================================================================
// Socket Stuff
//====================================================================================

// socket emit to take player to initial question
// $('button[name=playSubmit]').click(e=>{
//     // render next question 
//     console.log('clicking')
//     socket.emit('send new question', 1234);
// })

let playSubmit = document.getElementById('playSubmit1');

playSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    socket.emit('send new question', 1234);
    window.location.href = 'http://localhost:3000/game';
});