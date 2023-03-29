let oper;

const reeval = (val) => {
    wipe(oper);
    document.querySelector('#criticalBR').style.display = "inline";

    switch(val){

        case 'game':
            oper = document.querySelectorAll('.name, .icon, .ach_count, .platform');
            oper.forEach((element)=>{
                element.style.display = "inline";
            })
            break;

        case 'achievement':
            oper = document.querySelectorAll('.name, .description, .game, .completed, .rare, .custom, .icon');
            oper.forEach((element)=>{
                element.style.display = "inline";
            })
            break;
        
    }
}

const wipe = (oper) => {
    oper = document.querySelectorAll('label, input, br');
    oper.forEach((element)=>{
        element.style.display = "none";
    })
}

reeval(document.querySelector('select').value);