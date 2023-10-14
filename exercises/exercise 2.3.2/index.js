const divs = document.querySelectorAll("div");

divs.forEach((div) => {
    div.addEventListener("click", () => {
        div.textContent = div.style.backgroundColor;
    })
})

