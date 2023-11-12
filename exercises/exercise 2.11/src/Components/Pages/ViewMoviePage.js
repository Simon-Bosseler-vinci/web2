import { clearPage,renderPageTitle } from '../../utils/render';
import { readAllMovie } from '../../utils/movies';

const ViewMoviePage = () => {
  clearPage();
  renderPageTitle("ViewMoviePage");
  createTableMovies();
};


function createTableMovies () {

  const main = document.querySelector('main');

  const MOVIES = readAllMovie();
  const getMovies = getAllTableLine(MOVIES);
  const tableMovie = getTableMovie(getMovies);

  main.innerHTML += tableMovie;

};

function getTableMovie(tableLines){
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

function getAllTableLine(table){
  let movieTableLine = '';

  table?.forEach((movie) => {
    movieTableLine += `<tr>
    <td>${movie.id}</td>
    <td>${movie.title}</td>
    <td>${movie.duration}</td>
    <td>${movie.budget}</td>
    <td>${movie.link}</td>
    </tr>`;
  });
  return movieTableLine;
}


export default ViewMoviePage;