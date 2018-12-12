// append question 
let questionsapp = `
    <div class='question_main'>
        <div class='slider collapsed'>
            <div class="toggle">
                <div class="question_info">
                    <h1 class="SHOW_question_itself">Question</h1>
                    <h1 class="SHOW_question_time">Time</h1>
                    <span>
                        <button class="EDIT_question" >Edit</button>
                        <br>
                        <button class="DELETE_question">Delete</button>
                    </span>
                </div>
            </div>
            <div class="question_field">
                <label for="title">Question</label>
                <input type="text" name="question" class="question_itself">
                <br>
                <label for="title">Time (seconds)</label>
                <select class="question_time">
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25" selected="selected">25</option>
                </select>
                <br>
                <div class="answer_field">
                    <div class="answer_item">
                        <label for="question_answer">Answers</label>
                        <input type="text" name="answer" class="question_answer">
                        <span class="CHECK_correct">❌</span>
                        <button class="DELETE_answer">delete</button>
                    </div>
                </div>
                <br>
                <button class="ADD_answer">+</button>
                <input type="submit" value="Save" name="submit" class="SAVE_question">
            </div>
        </div>
    </div>
`
let ansPlace = `
    <div class="answer_item">
        <label for="question_answer">Answers</label>
        <input type="text" name="answer" class="question_answer">
        <span class="CHECK_correct">❌</span>
        <button class="DELETE_answer">delete</button>
    </div>
`
// add question block
$("#ADD_question").click(function () {
    $("#listofquestion").append(questionsapp);
    setTimeout(()=>{
        $('.question_main').addClass( "show" )
    },500)
});

// subblock under question block 
let config = { attributes: true, childList: true, subtree: true };
let cb = (mutationListe, observer) => {
    for (mutation in mutationListe) {
        if (mutation.type == 'subtree') {
            console.log('good to know that');
        } else {
            [...document.getElementsByClassName('CHECK_correct')].forEach((ele, index) => {
                ele.onclick = () => {
                    if (ele.className == 'CHECK_correct active') {
                        ele.className = 'CHECK_correct'
                        ele.innerText = "❌"
                    } else {
                        ele.className = 'CHECK_correct active'
                        ele.innerText = "✔️"
                    }
                }
            });

            [...document.getElementsByClassName('EDIT_question')].forEach((ele, index) => {
                ele.onclick = () => {
                    document.getElementsByClassName('slider')[index].className = 'slider expanded';
                }
            });

            [...document.getElementsByClassName('SAVE_question')].forEach((ele, index) => {
                ele.onclick = () =>{
                    document.getElementsByClassName('slider')[index].className = 'slider collapsed';

                    document.getElementsByClassName('SHOW_question_time')[index].innerText = document.getElementsByClassName('question_time')[index].value + ' s';
                    document.getElementsByClassName('SHOW_question_itself')[index].innerText = document.getElementsByClassName('question_itself')[index].value;
                }
            });

            [...document.getElementsByClassName('DELETE_question')].forEach((ele, index) => {
                ele.onclick = function () {
                    document.getElementsByClassName('question_main')[index].classList.remove('show')
                    setTimeout(() => {
                        document.getElementsByClassName('question_main')[index].remove();
                    }, 500);
                }
            });

            [...document.getElementsByClassName('ADD_answer')].forEach((ele, index) => {
                ele.onclick = () => {
                    $('.answer_field').eq(index).append(ansPlace)
                }
            });

            [...document.getElementsByClassName('DELETE_answer')].forEach((ele, index) => {
                ele.onclick = () => {
                    $(ele).parent().remove()
                }
            });
        }
    }
}
let observer = new MutationObserver(cb);
observer.observe($('#listofquestion')[0], config);

// submit quiz with all questions
document.getElementById('ADD_quiz').onclick = function () {
    let title = document.getElementById("quiz_title").value;
    let description = document.getElementById('quiz_description').value;
    let questions = [];
    [...document.getElementsByClassName('question_field')].forEach((ele, index) => {
        let question_itself = document.getElementsByClassName('question_itself')[index].value;
        let question_time = document.getElementsByClassName('question_time')[index].value;
        let answers = [];
        [...ele.getElementsByClassName('answer_item')].forEach((ele, index)=>{
            let answer = ele.children[1].value
            let correct = (ele.children[2].className == 'CHECK_correct active') ? true : false;
            let output = {
                answer : answer,
                correct : correct
            }
            answers.push(output)
        })
        questions.push({
            question : question_itself,
            time : question_time,
            answers : answers
        })
    })
    axios.post('/quiz_create', {
        method : 'create',
        quiz : title,
        description : description,
        questions : questions
    })
}