const dateTimeNow = new Date();

const date = dateTimeNow.toLocaleDateString();
const hour = dateTimeNow.toLocaleTimeString();

console.log(dateTimeNow.toLocaleDateString()); // 17/08/2020
console.log(dateTimeNow.toLocaleTimeString()); // 13:26:15

function addDateTime(message){
    return date + hour + message;
}

const message = addDateTime(" : This is the best moment to have a look at this website !")
alert(message);
