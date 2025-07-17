let toShuffle = ['a','b','c','d',];
const main = document.getElementsByTagName('main')[0];
let correct_answer_list = [];

function fetch_questions(toShuffle) {
    let ul = document.createElement('ul');
    let p = document.createElement('p');
    p.innerHTML = 'Question';
    main.appendChild(p);
    let answers = toShuffle;
    // answers.push(questions[i].correct_answer);
    let newIndex = Math.floor(Math.random() * answers.length);
    answers.splice(newIndex, 0, 'e');
    answers = shuffle(answers);
    for(let j = 0; j < answers.length; j++){
        let div = document.createElement('div');
        let radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'Question '+ (1);
        radio.id = 'Question'+(1)+'_option'+(j+1);
        let label = document.createElement('label');
        label.innerHTML = answers[j];
        // label.for = radio.id; //bawal daw to eh
        label.setAttribute('for', radio.id);

        if(answers[j] === 'e'){
            radio.addEventListener('click', correct);
            correct_answer_list.push(radio);
        }

        div.appendChild(radio);
        div.appendChild(label);
        if((j+1) % 2 === 0){
            // div.appendChild(document.createElement('br'));
        }
        ul.appendChild(div);
    }
    main.appendChild(ul);
}

function shuffle(toShuffle){
    for(let i = 0; i < toShuffle.length; i++){
        console.log("ehh");
        let toShift = toShuffle.splice(i, 1)[0];
        let newIndex = Math.floor(Math.random() * toShuffle.length);
        toShuffle.splice(newIndex, 0, toShift);
    }
    return toShuffle;
}

function correct(){
    console.log('eme');
}

function checkAnswers(){
    const radios = document.querySelectorAll('input[type="radio"]');
    for (let index = 0; index < radios.length; index++) {
        if(radios[index] === correct_answer_list[0] && radios[index].checked){
            console.log(radios[index]);
        }
    }
}

fetch_questions(toShuffle);