const dateTimeNow = new Date();

const date = dateTimeNow.toLocaleDateString();
const hour = dateTimeNow.toLocaleTimeString();

function addDateTime(message){
    return date + " " +  hour + message;
}

const message = addDateTime(" : This is the best moment to have a look at this website !") // on passe en paramètre le message
alert(message); // affichage en pop-up du message
