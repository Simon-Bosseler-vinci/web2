import { clearPage,renderPageTitle } from '../../utils/render';
import { readAllMovies, deleteOneMovie } from '../../utils/movies';
import Navigate from '../Router/Navigate';
import UpdatePage from './UpdatePage';

const ViewMoviePage = () => {
  clearPage();
  renderPageTitle("ViewMoviePage"); 
  createTableMovies();
};

async function createTableMovies () {

  const main = document.querySelector('main');

  const MOVIES = await readAllMovies(); 
  const getMovies = getAllTableLine(MOVIES);
  const tableMovie = getTableMovie(getMovies);
  main.innerHTML += tableMovie;

  const deleteButtons = document.querySelectorAll('.delete'); // on récupère un tableau sur base de la classe ".delete"
  deleteButtons.forEach(button => {
    button.addEventListener("click", (e) =>{ // l'event (e) permet de traiter boutton par boutton, et ici on s'en sert pour renvoyer son id
      const movieId = Number(e.target.dataset.elementId); // on récupére de l'objet son attribut data-element-id qui sera récupéré par e.target sous forme dataset(data).elementID(element-id)
      deleteOneMovie(movieId);
      Navigate('/');
    });
  })

  const updateButtons = document.querySelectorAll('.update');
  updateButtons.forEach(button => {
    button.addEventListener("click", (e) =>{
      const movieId = Number(e.target.dataset.elementId);
      UpdatePage(movieId);
    });
  });
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
        <button type='button' class="btn btn-danger delete" data-element-id="${movie.id}"> Delete </button>
        <button type='button' class="btn btn-primary update" data-element-id="${movie.id}"> Update </button>
    </td>
    </tr>`;

  });
  return movieTableLine; // on renvoie toutes les lignes (données) du tableau MOVIES
}


export default ViewMoviePage;