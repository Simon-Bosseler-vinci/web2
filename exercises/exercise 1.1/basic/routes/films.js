var express = require('express');
var router = express.Router();

const FILMS = [
    {
        id : 1,
        title : "Harry Potter",
        duration : 120,
        budget : 362000,
        link : "https://"
    },
    {
        id : 2,
        title : "Star Wars",
        duration : 109,
        budget : 529000,
        link : "https://"
    },
    {
        id : 3,
        title : "Indiana Jones - Le retour",
        duration : 132,
        budget : 713000,
        link : "https://"
    }
]

 /*router.get('/', (req, res, next) => {
    console.log('GET /films');
    res.json(FILMS); 
  });
  */

  // filtrer par ID
  
router.get('/:id',(req,res,next) => {

    const indexFound = FILMS.findIndex( film => film.id == req.params.id ); // on va créer la variable film directement dans la fonction et on va dire que
                                                                            // son id est celui entré dans l'URL
    if(indexFound < 0) return res.sendStatus(404);
    res.json(FILMS[indexFound]);
});

// filtrer par durée

router.get('/',(req,res,next) =>{
    
    const orderByDuration = req?.query['minimum-duration'] ? req.query['minimum-duration']  : undefined; // les [] permettent d'accéder au propriété d'un objet en évitant l'opérateur "-"

    let orderFilm;
    if(orderByDuration){
        orderFilm = [...FILMS].filter(film => film.duration >= orderByDuration); // on filtre dans une copie du tableau tous les films plus
                                                                                // grand que la variable orderByDuration
    }
    res.json(orderFilm ?? FILMS); // on renvoie le filtre et s'il est undefined, on renvoie le tableau par défaut
});

//ajouter un film

router.post('/',(req,res,next) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined; // vérification des paramètres entrés dans l'URL
    const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    if(!title || !duration || !budget || !link){
        res.sendStatus(400);
    }
    
    const nextID = FILMS.length +1;

    const newFilm = {
        id : nextID,
        title : title,
        duration : duration,
        budget : budget,
        link : link
    };

    FILMS.push(newFilm);

    res.json(newFilm);
});

module.exports = router;