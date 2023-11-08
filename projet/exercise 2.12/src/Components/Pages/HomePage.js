import {clearPage,renderPageTitle} from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';

import imgStarWars from '../../img/star-wars-plzcoaffexgf4h81.jpg';
import imgAvatar from '../../img/avatar.jpg';

const HomePage = () => {
  clearPage();
  renderPageTitle("HomePage");
  renderHomePage();
};

function renderHomePage(){

const main = document.querySelector('main');

// création d'une image
function createImage(src) {
  const image = document.createElement('img');
  image.src = src;
  image.className = 'img-fluid';
  return image;
};

// création des films
function createCard(src, movieTitle, movieDescription, src2, movieTitle2, movieDescription2) {
  const containerCenter = document.createElement('div');
  containerCenter.className = 'container text-center';
  main.appendChild(containerCenter);

  const row = document.createElement('div');
  row.className = 'row';
  main.appendChild(row);

  const col = document.createElement('div');
  col.className = 'col-6';
  row.appendChild(col);

  const col2 = document.createElement('div');
  col2.className = 'col';
  row.appendChild(col2);

  const card = document.createElement('div');
  card.className = 'card bg-warning';
  card.style = 'width: 40rem;';
  col.appendChild(card);

  const card2 = document.createElement('div');
  card2.className = 'card bg-warning';
  card2.style = 'width: 40rem;';
  col2.appendChild(card2);

  const title = document.createElement('h4');
  title.className = 'fw-bold';
  title.innerText = movieTitle;
  card.appendChild(title);

  const title2 = document.createElement('h4');
  title2.className = 'fw-bold';
  title2.innerText = movieTitle2;
  card2.appendChild(title2);

  const imageStarWars = createImage(src);
  card.appendChild(imageStarWars);

  const imageStarWars2 = createImage(src2);
  card2.appendChild(imageStarWars2);

  const p = document.createElement('p');
  p.innerText = movieDescription;
  card.appendChild(p);

  const p2 = document.createElement('p');
  p2.innerText = movieDescription2;
  card2.appendChild(p2);
};

function createMainPage() {

  const starWarsTitle = '1. Star Wars';
  const starWarsText =
    "La Guerre des étoiles, est un univers de science-fiction de type space fantasy créé par le réalisateur, scénariste et producteur américain George Lucas.L'univers Star Wars s'articule principalement autour de neuf films, sortis au cinéma entre 1977 et 2019 : Star Wars, épisode I : La Menace fantôme (1999), Star Wars, épisode II : L'Attaque des clones (2002), Star Wars, épisode III : La Revanche des Sith (2005), Star Wars, épisode IV : Un nouvel espoir (1977), Star Wars, épisode V : L'Empire contre-attaque (1980), Star Wars, épisode VI : Le Retour du Jedi (1983), Star Wars, épisode VII : Le Réveil de la Force (2015), Star Wars, épisode VIII : Les Derniers Jedi (2017) et Star Wars, épisode IX : L'Ascension de Skywalker (2019)b. George Lucas a réalisé lui-même les épisodes I à IV.";

  const avatarTitle = '2. Avatar';
  const avatarText =
    "Avatar est un film de science-fiction américain réalisé par James Cameron, sorti en 2009. Il s'agit du premier film de la franchise cinématographique Avatar.L'action se déroule en 21543 sur Pandora, une des lunes de Polyphème, une planète géante gazeuse en orbite autour d'Alpha Centauri A dans le système stellaire le plus proche de la Terre.";
 
  createCard(imgStarWars, starWarsTitle, starWarsText,imgAvatar,avatarTitle,avatarText);
}

createMainPage();

}

export default HomePage;
