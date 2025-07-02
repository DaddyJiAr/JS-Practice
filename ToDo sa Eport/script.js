const add_todo = document.getElementById('add-todo');
const create = document.getElementById('create');
const edit_button = document.getElementById('edit_button');
const edit_pop_up = document.getElementById('edit_pop_up');


add_todo.addEventListener('click', function (event){
    event.stopPropagation();
    let state = create.style.display;
    if(state == 'none' || state == ''){
        create.style.display = 'flex';
        edit_pop_up.style.display = 'none';
    }else{
        create.style.display = 'none'; // para if i-click ulet, maclose
    }
});

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
