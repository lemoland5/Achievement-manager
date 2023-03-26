let oper;

const reeval = (val) => {
    switch(val){

        case 'game':
            wipe(oper);
            oper = document.querySelectorAll('.name, .icon, .ach_count');
            oper.forEach((element)=>{
                element.style.display = "inline";
            })
            break;

        case 'achievement':
            wipe(oper);
            oper = document.querySelectorAll('.name, .description, .game, .completed, .rare, .custom');
            oper.forEach((element)=>{
                element.style.display = "inline";
            })
            break;
        
    }
}

const wipe = (oper) => {
    oper = document.querySelectorAll('label, input');
    oper.forEach((element)=>{
        element.style.display = "none";
    })
}

reeval(document.querySelector('select').value);