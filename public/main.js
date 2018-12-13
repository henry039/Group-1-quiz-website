$(function(){
    $('#logout').click(event=>{
        event.preventDefault();
        let logout = confirm('Are you sure you want to logout?')
        if(logout){
            window.location = '/logout'
        }
    })
})