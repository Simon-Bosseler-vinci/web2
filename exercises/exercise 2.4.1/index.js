const btn1 = document.querySelector("#buttonStart");
const btn2 = document.querySelector("#buttonClick");

btn1.addEventListener("mouseover", startTime);
btn2.addEventListener("click", countClick);

let chrono;
const time = 5000; // 5000ms = 5sec
let count = 0;

function startTime() {
    chrono = setTimeout( () => {
        alert(`Game over, you did not click 10 times within 5s`);
    }, time);
}

function countClick(){
    count++;
    if(count == 10){
        clearTimeout(chrono);
        alert(`You win ! You clicked 10 times within ${time} ms`)
    }
}