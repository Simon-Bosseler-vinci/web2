var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/pizzas.json'; // création du répertoire data dans lequel s'affichera les réponses

const MENU = [
  {
    id: 1,
    title: '4 fromages',
    content: 'Gruyère, Sérac, Appenzel, Gorgonzola, Tomates',
  },
  {
    id: 2,
    title: 'Vegan',
    content: 'Tomates, Courgettes, Oignons, Aubergines, Poivrons',
  },
  {
    id: 3,
    title: 'Vegetarian',
    content: 'Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives',
  },
  {
    id: 4,
    title: 'Alpage',
    content: 'Gruyère, Mozarella, Lardons, Tomates',
  },
  {
    id: 5,
    title: 'Diable',
    content: 'Tomates, Mozarella, Chorizo piquant, Jalapenos',
  },
];

// Read all the pizzas from the menu
/*router.get('/', (req, res, next) => {
  console.log('GET /pizzas');
  res.json(MENU);
}); */


// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => { // le router /:id permet d'indiquer à Express que l'iD se situe directement après le "/""
    console.log(`GET /pizzas/${req.params.id}`); // req.params récupère des segments de paramètres dans l'URL
  
    const indexOfPizzaFound = MENU.findIndex((pizza) => pizza.id == req.params.id); // variable qui trouve l'ID de la pizza 
  
    if (indexOfPizzaFound < 0) return res.sendStatus(404); // si l'on ne trouve pas d'ID, on renvoie une erreur 404
  
    res.json(MENU[indexOfPizzaFound]); // on renvoit dans json en prenant dans le MENU le bon index
  });


  /* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res, next) => {
    const orderByTitle = req?.query?.order?.includes('title') ? req.query.order : undefined; // résultat du if à gauche des ":" et résultat du else à droite
    // req.query permet de récupérer les paramètres dans l'URL après "?"
    // dans la constante orderbyTitle on vérifie si le paramètre order est bien "title", si oui on renvoie req.query.order avec 'title' sinon undefined  
    let orderedMenu;
    console.log(`order by ${orderByTitle ?? 'not requested'}`); // si orderByTitle n'est pas nulle on affiche "order by title" ou "-title" sinon "not requested"
    if (orderByTitle) // cas non-nulle
      orderedMenu = [...MENU].sort((a, b) => a.title.localeCompare(b.title)); // on trie les objets du tableau sur une copie du tableau 
    if (orderByTitle === '-title') orderedMenu = orderedMenu.reverse();
  
    console.log('GET /pizzas');
    res.json(orderedMenu ?? MENU); // on renvoie dans le json le tableau par défaut si la variable orderedMenu est nulle
  });

  // Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined; // vérification des paramètres
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;

  console.log('POST /pizzas');

  if (!title || !content) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = MENU?.length !== 0 ? MENU.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? MENU[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newPizza = {
    id: nextId,
    title: title,
    content: content,
  };

  MENU.push(newPizza);

  res.json(newPizza);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  console.log(`DELETE /pizzas/${req.params.id}`);

  const foundIndex = MENU.findIndex(pizza => pizza.id == req.params.id); // on prend le req.params de l'URL (findIndex() renvoie -1 si rien de trouver)

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = MENU.splice(foundIndex, 1); // la méthode splice() retire les éléments et créé un tableau de ces éléments supprimés
  const itemRemoved = itemsRemovedFromMenu[0]; // on récupère la seule valeur qui est en première position du tableau renvoyé par la méthode splice()

  res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  console.log(`PATCH /pizzas/${req.params.id}`);

  const title = req?.body?.title !== 0 ? req.body.title : undefined; // vérification des paramètres 
  const content = req?.body?.content !== 0 ? req.body.content : undefined;

  console.log('POST /pizzas');

  if (!title && !content) return res.sendStatus(400); // si aucun paramètres de changement n'est mit, erreur (patch changement d'un paramètre) => Put nécessite tout ! 

  const foundIndex = MENU.findIndex(pizza => pizza.id == req.params.id); // on prend l'ID de la pizza à modifier (-1 si n'existe pas)

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedPizza = {...MENU[foundIndex], ...req.body}; // dans une copie du tableau au bon ID, on écrase les anciennes valeurs par les nouvelles (req.body) 

  MENU[foundIndex] = updatedPizza; // on met à jour dans le tableau au bon ID

  res.json(updatedPizza);
});

 
module.exports = router;
