$(function(){
    $('td.link').click(function(event){
        event.preventDefault();

        let index = $(this).attr('id');

        window.location = `/quiz_edit/${index}`;
    })
})