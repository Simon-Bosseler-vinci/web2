const body = document.querySelector("body");
const divMessage = document.querySelector("#message");
const divCounter = document.querySelector("#counter");

body.addEventListener("click",countClick); // on pourrait mettre un window.addEventListener() pour afficher sur tous l'écran étant que body est trop petit
                                           // il suffit d'augmenter la taille du body via le CSS
 let count = 0;
 let message = "";

function countClick(){
    
    count++;
    if(count >=5 && count <=9 ){
        message = "Bravo, bel échauffement !";
    }
    if(count >= 10){
        message = "Vous êtes passé maître en l'art du clic";
    }

    divMessage.textContent = message;
    divCounter.textContent = count;
}