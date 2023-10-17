const red = document.querySelector(".red");
const orange = document.querySelector(".orange");
const green = document.querySelector(".green");

red.style.background="red"; // phase initial 

let phase = 1;
setInterval(() => {
    if (phase == 1) {
        orange.style.background = "orange";
        red.style.background = "white";
    } else if (phase == 2){
        green.style.background = "green";
        orange.style.background = "white";
    }else if(phase == 3){
        orange.style.background = "orange";
        green.style.background = "white";
    }else if(phase == 4){
        red.style.background = "red";
        orange.style.background = "white";
        phase = 0; // on revient au début (attention mettre phase 0 pour qu'à l'incrémentation, on revient à 1)
    }
    phase++;
}, 1000); // au bout des 2sec, on exécute toute la méthode
