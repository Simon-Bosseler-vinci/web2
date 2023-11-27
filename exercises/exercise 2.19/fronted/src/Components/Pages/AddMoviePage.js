import { clearPage, renderPageTitle } from '../../utils/render';
import {readAllMovie} from '../../utils/movies';
import Navigate from "../Router/Navigate";

const AddMoviePage = () => {
  clearPage();
  renderPageTitle("AddMoviePage");
  addMovie();
};


function addMovie(){
  const main = document.querySelector('main'); // recherche sur Bootstrap pour la création d'un formulaire
  main.innerHTML += `
  <form> 
  <fieldset>
    <div class="mb-3">
      <label for="titleInput" class="form-label">Title</label>
      <input type="text" minlength="3" maxlength="20" id="titleInput" class="form-control" placeholder="Title input" required>
    </div>
    <div class="mb-3">
      <label for="durationInput" class="form-label">Duration</label>
      <input type="time" min="01:00" max="04:00" id="durationInput" class="form-control" placeholder="Duration input" required>
    </div>
    <div class="mb-3">
      <label for="budgetInput" class="form-label">Budget</label>
      <input type="number" min="100" max="100 000" id="budgetInput" class="form-control" placeholder="Budget input" required>
    </div>
    <div class="mb-3">
      <label for="linkInput" class="form-label">Link</label>
      <input type="url" id="linkInput" class="form-control" placeholder="Link input" required>
    </div>
    <button type="submit" class="btn btn-primary">Ajouter Film</button>
  </fieldset>
</form>
  `;

  const formulaire = document.querySelector('form');
  formulaire.addEventListener('submit',addOneMovie);
}

async function addOneMovie(e){
  e.preventDefault();
  const nextID = readAllMovie.length +1;
  const title = document.querySelector('#titleInput').value;
  const duration = document.querySelector('#durationInput').value;
  const budget = document.querySelector('#budgetInput').value;
  const link = document.querySelector('#linkInput').value;

  const options = {
    method : 'POST',
    body : JSON.stringify({
      nextID,
      title,
      duration,
      budget,
      link
    }),
    headers : {
      'Content-type' : 'application/json',
    },
  };

  const reponse = await fetch('/api/films',options); // on utilise un proxy (/api) !! Pour éviter de relacher la sécurité
  if(!reponse.ok)throw new Error(`fetch error : ${reponse.status} : ${reponse.statusText}`);

  Navigate('/');
}

export default AddMoviePage;
