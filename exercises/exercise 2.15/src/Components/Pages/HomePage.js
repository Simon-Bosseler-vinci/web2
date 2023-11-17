
import {clearPage} from '../../utils/render';

const HomePage = () => {
  clearPage();
  // fetch est asynchrone donc le programme n'attend pas les résultats, directement après le début de fetch, on passe à l'instruction suivante
  fetch('https://v2.jokeapi.dev/joke/Any?type=single') // renvoie d'une promesse via la requête HTTP d'un browser vers des API
  .then((response) => {
    if(!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    return response.json(); // si le promesse est réussite(fetch a eu un flux de données avec la restful API) on la renvoie en Json, sinon erreur 
  })
  .then((jokes) => { // .then() permet de chainer des traitements asynchrones (le chainage se fait si l'on reçoit tout d'abord la promesse)
    renderJokes(jokes); // donc si et seulement si on a reçu une promesse, on passera par cet appel de méthode
  })
  .catch((err) => { // permet d'exécuter une callback lorsque la tâche asynchrone associée à la promesse échoue (affichage message d'erreur dans la console)
    console.error('HomePage::error ', err);
  })
};

function renderJokes(joke){
   const main = document.querySelector("main");
   main.innerHTML = `
   <div class = "card text-center mb-3">
   <div class="card-body">
   <h5 class="card-title">Category : ${joke.category} </h5>
     <p class = "card-text">  
          Joke : ${joke.joke}</p>
   </div>
   </div>
   `;
};

export default HomePage;
