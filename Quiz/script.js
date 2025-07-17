let general_easy = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
const main = document.getElementsByTagName('main')[0];
let correct_answer_list = [];
let number_of_choices = 4;

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
        let ul = document.createElement('ul');
        let p = document.createElement('p');
        p.innerHTML = (i+1) + ". " + questions[i].question;
        main.appendChild(p);
        let answers = questions[i].incorrect_answers;
        // answers.push(questions[i].correct_answer);
        let newIndex = Math.floor(Math.random() * answers.length);
        answers.splice(newIndex, 0, questions[i].correct_answer);
        answers = shuffle(answers);
        for(let j = 0; j < answers.length; j++){
            let div = document.createElement('div');
            let radio = document.createElement('input');
            radio.type = 'radio';
            console.log(i+1);
            radio.name = 'Question '+ (i+1);
            radio.id = 'Question'+(i+1)+'_option'+(j+1);
            let label = document.createElement('label');
            label.innerHTML = answers[j];
            // label.for = radio.id; //bawal daw to eh
            label.setAttribute('for', radio.id);

            if(answers[j] === questions[i].correct_answer){
                radio.addEventListener('click', correct);
                correct_answer_list.push(radio);    
            }

            div.appendChild(radio);
            div.appendChild(label);
            if((j+1) % 2 === 0){
                div.appendChild(document.createElement('br'));
            }
            ul.appendChild(div);
        }
        main.appendChild(ul);
    }
}

let toShuffle = ['a','b','c','d',];

function correct(){
    console.log('correct');
}

function shuffle(toShuffle){
    for(let i = 0; i < toShuffle.length; i++){
        let toShift = toShuffle.splice(i, 1)[0];
        let newIndex = Math.floor(Math.random() * toShuffle.length);
        toShuffle.splice(newIndex, 0, toShift);
    }
    return toShuffle;
}

function checkAnswers(){
    let score = 0;
    const radios = document.querySelectorAll('input[type="radio"]');
    let radio_index = 0;
    for (let i = 0; i < correct_answer_list.length; i++) {
        let skip = 4;
        for(let j = 0; j < number_of_choices; j++, radio_index++){
            if(radios[radio_index] === correct_answer_list[i] && radios[radio_index].checked){
                console.log(radios[i]);
                radio_index += skip;
                score++;
                break;
            }else{
                skip--;
            }
        }
    }
    return score;
}

function displayScore(){
    const score = checkAnswers();
    const body = document.getElementsByTagName('body')[0];
    const score_p = document.createElement('p');
    score_p.innerHTML = 'Your score: ' + score;
    body.appendChild(score_p);
}

// console.log("ehh");
console.log(shuffle(toShuffle));
fetch_questions(general_easy);