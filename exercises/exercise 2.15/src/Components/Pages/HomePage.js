
import {clearPage} from '../../utils/render';

const HomePage = () => {
  clearPage();
  
  fetch('https://v2.jokeapi.dev/joke/Any?type=single')
  .then((response) => {
    if(!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    return response.json();
  })
  .then((jokes) => {
    renderJokes(jokes);
  })
  .catch((err) => {
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
