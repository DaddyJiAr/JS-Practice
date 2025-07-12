const formula = document.getElementById('formula_input');
const buttons = document.getElementsByClassName('button');
const equal = document.getElementById('equal');
const clear = document.getElementById('clear');
const remove = document.getElementById('remove');
const validKeys = [
        '1','2','3','4','5','6','7','8','9','0',
        '.','π','ⓧ','AC','*','÷','+','-','Ans','=',
    ];

formula.addEventListener('keypress', function(event){
    event.stopPropagation();
});

formula.addEventListener('input', clean);
formula.addEventListener('keydown', function (event){
    if(event.key === "Enter") calculate();
});

equal.addEventListener('click', calculate);
clear.addEventListener('click', function(){
    formula.value = "";
});
remove.addEventListener('click', removeFunc);

function removeFunc(){
    if(formula.value.length === 0) return;
    formula.value = formula.value.substr(0, formula.value.length-1);
}


function calculate(){
    let nums = formula.value.match(/(\d+(?:\.\d+)?)|[\+\-\*\÷]/g);
    if(nums && calculatable(formula.value.charAt(formula.value.length-1))){
        console.log(nums);
        nums = handleMD(nums);
        console.log(nums);
        nums = handlePM(nums);
        console.log(nums);

    }else return;
}


function handleMD(numList){
    let previous_num = 0;
    let next_num = 0;
    let m_or_d = true;
    do{
        m_or_d = false;
        for(let i = 0; i < numList.length; i++){
            if(numList[i] === "*"){
                next_num = numList[i+1]
                numList[i+1] = Number(previous_num) * Number(next_num);
                numList[i-1] = "0";
                numList[i] = "0";
                i+=2;
                m_or_d = true;
            }else if(numList[i] === "÷"){
                next_num = numList[i+1]
                numList[i+1] = Number(previous_num) / Number(next_num);
                numList[i-1] = "0";
                numList[i] = "0";
                i+=2;
                m_or_d = true;
            }else{
                previous_num = numList[i];
            }
        }
    }while(m_or_d);
    numList = numList.filter(num => num !== "0");
    return numList;
}

function handlePM(numList){
    let previous_num = 0;
    let next_num = 0;
    let m_or_d = true;
    do{
        m_or_d = false;
        for(let i = 0; i < numList.length; i++){
            if(numList[i] === "+"){
                next_num = numList[i+1]
                numList[i+1] = Number(previous_num) + Number(next_num);
                numList[i-1] = "0";
                numList[i] = "0";
                i+=2;
                m_or_d = true;
            }else if(numList[i] === "-"){
                next_num = numList[i+1]
                numList[i+1] = Number(previous_num) - Number(next_num);
                numList[i-1] = "0";
                numList[i] = "0";
                i+=2;
                m_or_d = true;
            }else{
                previous_num = numList[i];
            }
        }
    }while(m_or_d);
    numList = numList.filter(num => num !== "0");
    return numList;
}

function cleanList(indicesOfToRemove, numList){
    for(let i = 0; i < indicesOfToRemove.length; i++){
        numList.splice
    }
}

function calculatable(last){ // lol
    switch (last){
        case "+":
        case "-":
        case "*":
        case "÷":
            return false;
        default:
            return true;
    }
}

function clean() {
    let clean = formula.value.replace(/[^0-9+\-*÷.]/g, ""); //dikolam
    formula.value = clean;
}

function check(key){
    switch (key){
        case "+":
        case "-":
        case "*":
        case "÷":
            if(formula.value.length === 0){
                return false;
            }
            switch (formula.value.charAt(formula.value.length-1)){
                case "+":
                case "-":
                case "*":
                case "÷":
                    return false;
                default:
                    return true;
                }
        default:
            return true;
    }
}

function checkPeriod(period){
    const nums = formula.value.match(/\d+(?:\.\d+)?/g); // matches any number with decimal optional
    if(!Number.isInteger(Number(nums[nums.length-1]))){
        return;
    }
    if(period !== "."){
        return;
    }
    if(formula.value.length === 0){
        formula.value = "0.";
        return;
    }
    switch (formula.value.charAt(formula.value.length-1)){
        case "+":
        case "-":
        case "*":
        case "÷":
            formula.value += "0.";
            return;
    }
    if(formula.value.charAt(formula.value.length-1) === "."){
        return;
    }
    formula.value += ".";
}

window.addEventListener('keydown', function(event) {
    if(document.activeElement !== formula){
        if (validKeys.includes(event.key)) {
            if(event.key === "."){
                checkPeriod(event.key);
            }else{
                if(check(event.key)){
                    formula.value += event.key;
                }
            }
            clean();
        }
        if(event.key === 'Backspace'){
            removeFunc();
        }
        if(event.key === 'Enter'){
            calculate();
        }
    }
});

window.addEventListener('DOMContentLoaded', function(){
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', function(){
            if(validKeys[i] === "."){
                checkPeriod(validKeys[i]);
            }else{
                if(check(validKeys[i])){
                    formula.value += validKeys[i];
                }
            }
            clean();
        });
    }
});

