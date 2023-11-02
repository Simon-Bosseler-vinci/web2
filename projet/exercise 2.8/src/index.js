import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import imgStarWars from './img/star-wars-plzcoaffexgf4h81.jpg';
import imgAvatar from './img/avatar.jpg';
import imgSimon from './img/Kent%20Larsson05.jpg';

const wrapper = document.querySelector('.container');

// création du titre
function createTitle(name) { 
  
  const title = document.createElement('h1');
  title.className = 'text-center mt-3 text-decoration-underline';
  title.innerText = name;

  wrapper.appendChild(title);
};

// création d'une image
function createImage(src) {
  const image = document.createElement('img');
  image.src = src;
  image.className = 'img-fluid';
  return image;
};

// création des films
function createCard(src, movieTitle, movieDescription) {
  const containerCenter = document.createElement('div');
  containerCenter.className = 'container text-center';
  wrapper.appendChild(containerCenter);

  const row = document.createElement('div');
  row.className = 'row';
  wrapper.appendChild(row);

  const col = document.createElement('div');
  col.className = 'col';
  row.appendChild(col);

  const card = document.createElement('div');
  card.className = 'card bg-warning';
  card.style = 'width: 40rem;';
  col.appendChild(card);

  const title = document.createElement('h4');
  title.className = 'fw-bold';
  title.innerText = movieTitle;
  card.appendChild(title);

  const imageStarWars = createImage(src);
  card.appendChild(imageStarWars);

  const p = document.createElement('p');
  p.innerText = movieDescription;
  card.appendChild(p);
};

// création d'un bouton
function createButton(text, method) {
  const button = document.createElement('button');

  button.innerText = text;
  button.style.margin = 'auto';
  button.addEventListener('click', method); // lorsque que l'on clique sur le bouton, on appelle la méthode passée en paramètre

  const divBouton = document.createElement('div');
  wrapper.appendChild(divBouton);
  divBouton.appendChild(button);
};

function createMainPage() {
  wrapper.innerHTML = '';

  const starWarsTitle = '1. Star Wars';
  const starWarsText =
    "La Guerre des étoiles, est un univers de science-fiction de type space fantasy créé par le réalisateur, scénariste et producteur américain George Lucas.L'univers Star Wars s'articule principalement autour de neuf films, sortis au cinéma entre 1977 et 2019 : Star Wars, épisode I : La Menace fantôme (1999), Star Wars, épisode II : L'Attaque des clones (2002), Star Wars, épisode III : La Revanche des Sith (2005), Star Wars, épisode IV : Un nouvel espoir (1977), Star Wars, épisode V : L'Empire contre-attaque (1980), Star Wars, épisode VI : Le Retour du Jedi (1983), Star Wars, épisode VII : Le Réveil de la Force (2015), Star Wars, épisode VIII : Les Derniers Jedi (2017) et Star Wars, épisode IX : L'Ascension de Skywalker (2019)b. George Lucas a réalisé lui-même les épisodes I à IV.";

  const avatarTitle = '2. Avatar';
  const avatarText =
    "Avatar est un film de science-fiction américain réalisé par James Cameron, sorti en 2009. Il s'agit du premier film de la franchise cinématographique Avatar.L'action se déroule en 21543 sur Pandora, une des lunes de Polyphème, une planète géante gazeuse en orbite autour d'Alpha Centauri A dans le système stellaire le plus proche de la Terre.";
 
  createTitle('Présentation des films');
  createCard(imgStarWars, starWarsTitle, starWarsText);
  createCard(imgAvatar, avatarTitle, avatarText);
  createButton('About', createAboutPage);
}

function createAboutPage() {
  wrapper.innerHTML = '';

  createTitle('About');
  createCard(
    imgSimon,
    "Qui suis-je ?",
    "Je m'appelle Simon Bosseler et je suis en deuxième année de mon bachelier en informatique de gestion. Plus tard je souhaitrais travailler en entreprise luxembourgeoise dans le domaine des base de données ou de la cybersécurité.",
  );
  createButton('Home', createMainPage);
}

createMainPage();
