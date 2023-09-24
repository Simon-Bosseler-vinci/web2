var express = require('express');
var router = express.Router();

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
    const orderByTitle = req?.query?.order?.includes('title') // req.query permet de récupérer les paramètres dans l'URL après "?"
                                                              // dans la constante on vérifie si le paramètre order est bien "title"   
    let orderedMenu;
    console.log(`order by ${orderByTitle ?? 'not requested'}`); // si orderByTitle n'est pas nulle on affiche "order by title" ou "-title" sinon "not requested"
    if (orderByTitle) // cas non-nulle
      orderedMenu = [...MENU].sort((a, b) => a.title.localeCompare(b.title)); // on trie les objets du tableau 
    if (orderByTitle === '-title') orderedMenu = orderedMenu.reverse();
  
    console.log('GET /pizzas');
    res.json(orderedMenu ?? MENU); // on renvoie dans le json le tableau par défaut si la variable orderedMenu est nulle
  });

  // Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
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

  
module.exports = router;
