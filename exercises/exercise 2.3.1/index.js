const formulaire = document.querySelector("form");
const divMessage = document.querySelector("#message"); // prendre la valeur de la div
const answer = document.querySelector("#wish"); // prendre la valeur du souhait entré dans le formulaire

formulaire.addEventListener("submit", (e) => {
 e.preventDefault(); // permet de stopper le chargement automatique de la page web

  formulaire.style.display = "none"; // on supprime l'affichage du formulaire
  divMessage.textContent = answer.value; // on affiche la valeur de la div en mettant le message du formulaire
})
  