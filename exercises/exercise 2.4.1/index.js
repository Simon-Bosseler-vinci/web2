const btn1 = document.querySelector("#buttonStart");
const btn2 = document.querySelector("#buttonClick");

btn1.addEventListener("mouseover", startTime);
btn2.addEventListener("click", countClick);

let chrono;
let count = 0;
let start; // on l'initialise ici car on l'utilise dans les deux fonctions (comme la variable chrono)

function startTime() {
    chrono = setTimeout( () => {
        alert(`Game over, you did not click 10 times within 5s`);
    }, 5000); // si on dépasse 5sec, on envoie alert()
    start = new Date(); // on prend la date (le temps) du démarrage 
}

function countClick(){
    count++;
    if(count == 10){
        clearTimeout(chrono); // si on atteint 10 clicks, on arrête le chrono des 5sec et on affiche un pop-up 
        const end = new Date(); // on prend la date (le temps) lorsque l'on atteint 10 clicks
        const t = end.getTime() - start.getTime();
        alert(`You win ! You clicked 10 times within ${t} ms`) // on affiche le temps prit pour faire les 10 clicks
    }
}