const add_todo = document.getElementById('add-todo');
const create = document.getElementById('create');
const edit_button = document.getElementById('edit_button');
const edit_pop_up = document.getElementById('edit_pop_up');
const description_textarea = document.getElementById('description');

let todo_index_selected = -1;

// const checker = setInterval(function(){
//     console.log(todo_index_selected);
//     if(todo_index_selected !== -1){
//         description_textarea.style.display = 'block';
//     }else{
//         // description_textarea.style.display = 'block';
//     }
// }, 500);



// localStorage.removeItem('todos');
// localStorage.removeItem('todo_id');

// const handleTitleClick = function (element){
//     const title = document.getElementById('title');
//     title.value = element.textContent;
//     console.log(element.textContent);
// };

description_textarea.addEventListener('input', function (){
    todos[todo_index_selected].description = this.value;
    localStorage.setItem('todos', JSON.stringify(todos));
});

let todos;

class ToDo{
    static todo_id = Number(localStorage.getItem('todo_id')) || 0; // get id from localstorage, else 0
    constructor(title, description){
        this.id = ToDo.todo_id;
        this.title = title;
        this.description = description;
        ToDo.todo_id++;
        localStorage.setItem('todo_id', ToDo.todo_id);
    }
}

window.addEventListener('DOMContentLoaded', function (){
    todos = JSON.parse(this.localStorage.getItem('todos')) || [];
    const todos_parent = document.getElementById('to-dos');
    if(todos.length !== 0){
        refreshList();
    }else{
        const p_tag = document.createElement('p');
        p_tag.textContent = 'No todos here.';
        p_tag.style.color = 'rgb(193, 186, 186)';
        todos_parent.append(p_tag);
    }
    todo_index_selected = 0;
    console.log(todos[todo_index_selected].title);
});


description_textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
    todos[todo_index_selected].description = description_textarea.value;
});

add_todo.addEventListener('click', function (event){
    event.stopPropagation();
    const input_element = document.getElementById('title-input');
    let state = create.style.display;
    if(state == 'none' || state == ''){
        create.style.display = 'flex';
        edit_pop_up.style.display = 'none';
        input_element.focus();
    }else{
        create.style.display = 'none'; // para if i-click ulet, maclose
    }
});

function onEnter(event){
    if(event.key == 'Enter'){
        add();
    }
}

function add(){
    const input_element = document.getElementById('title-input');
    const input = String(input_element.value);
    if(input.length === 0){
        return alert("Title can't be empty");
    }
    input_element.value = '';
    create.style.display = 'none';

    todos.push(new ToDo(input,''));
    localStorage.setItem('todos', JSON.stringify(todos));
    refreshList();
}

function refreshList(){
    const todos_parent = document.getElementById('to-dos');
    const p_tags = todos_parent.querySelectorAll('p');
    const title = document.getElementById('title');
    
    p_tags.forEach(element => {
        element.remove();
    });

    todos.forEach(element => {
        let p_tag = document.createElement('p');
        p_tag.textContent = element.title;
        p_tag.style.color = 'white';
        p_tag.classList.add('titles');
        p_tag.addEventListener('click', function() {
            title.value = element.title;
            todo_index_selected = element.id;
            description_textarea.style.display = 'block';
            description_textarea.value = element.description;
        });
        todos_parent.append(p_tag);
    });

    // addTitleEvents();

}

function cancel(){
    create.style.display = 'none';
}
edit_button.addEventListener('click', function (event){
    event.stopPropagation();
    let state = edit_pop_up.style.display;
    if(state == 'none' || state == ''){
        edit_pop_up.style.display = 'flex';
        create.style.display = 'none';
    }else{
        edit_pop_up.style.display = 'none'; // para if i-click ulet, maclose
    }
});

document.addEventListener('click', function (event){
    let state = edit_pop_up.style.display;
    // edit
    if(!edit_pop_up.contains(event.target) && !edit_button.contains(event.target) && state == 'flex'){
        edit_pop_up.style.display = 'none';
    } 
    if(!create.contains(event.target) && !add_todo.contains(event.target)){
        create.style.display = 'none';
    }
});

function addTitleEvents(){
    const title_elements = document.getElementsByClassName('titles'); 
    Array.from(title_elements).forEach(element => { //Array.from() kasi HTML Collection dsaw yung return ni by classname
        element.addEventListener('click', function () {
            const title = document.getElementById('title');
            title.value = element.textContent;
            console.log(element.textContent);
        });
    });
}