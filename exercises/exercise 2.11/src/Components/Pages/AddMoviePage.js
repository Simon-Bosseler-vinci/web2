import { clearPage, renderPageTitle } from '../../utils/render';
import {addOneMovie} from '../../utils/movies';
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
  formulaire.addEventListener("submit", (e) =>{ // e est utilisé pour faire un e.preventDefault(), ce qui empêche de recharger la page au submit
    // il faut empêcher de recharger la page car cela va recharger le site et réintiliser la liste des films
    const title = document.querySelector('#titleInput');
    const duration = document.querySelector('#durationInput');
    const budget = document.querySelector('#budgetInput');
    const link = document.querySelector('#linkInput');

    addOneMovie(title.value,duration.value,budget.value,link.value); // on ajoute le movie DANS la fonction en paramètre du addEventListener
    e.preventDefault();
    Navigate('/viewMoviePage'); // on redirige vers la page des views
  }); 

}

export default AddMoviePage;
