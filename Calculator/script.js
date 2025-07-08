const formula = document.getElementById('formula_input');

formula.addEventListener('input', function (){
    // let complete = this.value.match(/(\d+)|[\+\-\*\/]/g); // use this para hatiin
    // if (complete) {
    //     console.log(complete);
    //     for (let index = 0; index < complete.length; index++) {
    //         const element = complete[index];
    //         console.log(element);
    //     }
    // }
    let complete = this.value.match(/(\d+[\+\-\*\/])+(\d+)/);
    // if(complete){
    //     complete = complete[0];
    //     complete = complete.match(/\d+/g);
    //     for(let i = 0; i < complete.length; i++){
    //         console.log(complete[i]);
    //     }
    // }
});

