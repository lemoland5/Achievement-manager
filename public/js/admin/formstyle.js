const reeval = () =>{
    const obscure = document.querySelectorAll('input, label');
    obscure.forEach((element)=>{
        element.style.display = 'none';
    })

    let show;

    switch(dropdown.value){
        case "game":
            show = document.querySelectorAll(".name, .icon");
            show.forEach((element)=>{
                element.style.display = 'inline'
            })
            break;
        case "achievement" :
            show = document.querySelectorAll(".name, .description, .game, .rare, .custom, .completed, .icon");
            show.forEach((element)=>{
                element.style.display = 'inline'
            })
            break;
        default:
            break;
    }
}

const dropdown = document.querySelector("#type");
reeval();
