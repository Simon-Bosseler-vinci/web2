import { clearPage, renderPageTitle } from '../../utils/render';
import {  updateOneFilm, readOneMovie } from '../../utils/movies';


const UpdateMoviePage = (movieId) => {
    clearPage();
    renderPageTitle("Update a movie page" );
    updateFilm( movieId );
  };

  async function updateFilm(movieId){

    const movie = await readOneMovie(movieId);

    const main = document.querySelector('main'); 
  main.innerHTML += `
  <form> 
  <fieldset>
    <div class="mb-3">
      <label for="titleInput" class="form-label">Title to update : </label>
      <input type="text" minlength="3" maxlength="20" id="titleInput" class="form-control" placeholder="${movie.title}" required>
    </div>
    <div class="mb-3">
      <label for="durationInput" class="form-label">Duration to update : </label>
      <input type="time" min="01:00" max="04:00" id="durationInput" class="form-control" placeholder="${movie.duration}" required>
    </div>
    <div class="mb-3">
      <label for="budgetInput" class="form-label">Budget to update : </label>
      <input type="number" min="100" max="100 000" id="budgetInput" class="form-control" placeholder="${movie.budget}" required>
    </div>
    <div class="mb-3">
      <label for="linkInput" class="form-label">Link to update : </label>
      <input type="url" id="linkInput" class="form-control" placeholder="${movie.link}" required>
    </div>
    <button type="submit" class="btn btn-primary">Update Movie</button>
  </fieldset>
</form>
  `;



  const formulaire = document.querySelector('form');
  formulaire.addEventListener("submit", async()=>{

    const title = document.querySelector('#titleInput').value;
    const duration = document.querySelector('#durationInput').value;
    const budget = document.querySelector('#budgetInput').value;
    const link = document.querySelector('#linkInput').value;


     await updateOneFilm(movieId,title,duration,budget,link);
  });
  }
  
  export default UpdateMoviePage;