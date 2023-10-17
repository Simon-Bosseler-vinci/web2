const btn1 = document.querySelector("#myBtn1");
const btn2 = document.querySelector("#myBtn2");

btn1.addEventListener("click", delayedAlert);
btn2.addEventListener("click", clearAlert);

let timeoutID;
const delayInSeconds = 2;
const delayInMiliSeconds = delayInSeconds * 1000;

function delayedAlert() {
  timeoutID = setTimeout(() => { // la fonction setTimeOut() attent une fonction en 1er arg et en 2ème arg un temps défini avant d'appeler le 1er arg
    alert(`You asked for this popup ${delayInSeconds}s ago!`);
  }, delayInMiliSeconds);
}

function clearAlert() {
  clearTimeout(timeoutID); // la fonction clearTimeOut permet d'arrêter la fonction lancée de setTimeout()
}
