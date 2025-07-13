let general_easy = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
const main = document.getElementsByTagName('main')[0];



async function fetch_questions(url) {
    const questions_api = await fetch(url);
    const question_data = await questions_api.json();
    const questions = question_data.results;

    if(question_data.response_code !== 0){
        console.log(question_data.code);
        console.log('May error. Sabihin mo nalang kay developer.');
        return;
    }

    for(let i = 0; i < questions.length; i++){
        console.log(questions[i]);
        let p = document.createElement('p');
        p.innerHTML = (i+1) + ". " + questions[i].question;
        main.appendChild(p);
    }

}

fetch_questions(general_easy);