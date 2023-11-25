import { clearPage,renderPageTitle } from '../../utils/render';
import { readAllMovie, deleteOneMovie } from '../../utils/movies';
import Navigate from '../Router/Navigate';

const ViewMoviePage = () => {
  clearPage();
  renderPageTitle("ViewMoviePage"); 
  createTableMovies();
};

async function createTableMovies () {

  const main = document.querySelector('main');

  const MOVIES = await readAllMovie();
  const getMovies = getAllTableLine(MOVIES);
  const tableMovie = getTableMovie(getMovies);
  main.innerHTML += tableMovie;

  const deleteButtons = document.querySelectorAll('.btn btn-danger delete'); // on récupère un tableau sur base de la classe ".delete"
  deleteButtons.forEach(button => {
    button.addEventListener("click", (e) =>{
      const movieId = Number(e.target.id);
      deleteOneMovie(movieId);
      Navigate('/');
    });
  })

};

function getTableMovie(tableLines){ // on passe en paramètre les films récupérés d'avant
  const tableMovie = `
  <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Title</th>
      <th scope="col">duration</th>
      <th scope="col">budget</th>
      <th scope="col">link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      ${tableLines}
    </tr>
  </tbody>
</table>`;

return tableMovie;

}

function getAllTableLine(table){ // on passe en paramètres les films que l'on a récupéré par la méthode readAllMovie()
  let movieTableLine = '';

  table?.forEach((movie) => {
    movieTableLine += `<tr>
    <td id='idInput'>${movie.id}</td>
    <td>${movie.title}</td>
    <td>${movie.duration}</td>
    <td>${movie.budget}</td>
    <td>${movie.link}</td>
    <td> 
        <button type='button' class="btn btn-danger delete" data-element-id="${movie.id}">Delete</button>
    </td>
    </tr>`;

  });
  return movieTableLine; // on renvoie toutes les lignes (données) du tableau MOVIES
}



export default ViewMoviePage;