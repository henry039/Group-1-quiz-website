$(function(){
    $('input[name=submit]').click(e=>{
        e.preventDefault();

        let question = $('input[name=question]').val();
        let time = $('input[name=time]').val();
        let ans = $('input[name=answer]').val();
        let correct = $('input[name=correct]').val();

        axios.post('/question_create', {
            question : question,
            time : time,
            answer : ans,
            correct : correct
        })
    })
})