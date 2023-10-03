var express = require('express');
const { serialize, parse } = require('../utils/json');
var router = express.Router();

const jsonDbPath = __dirname + '/../data/films.json';

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

    const films = parse(jsonDbPath,FILMS); // on recherche le fichier, si pas trouvé on renvoie FILMS, sinon on renvoie le fichier contentant les modifs

    const indexFound = films.findIndex( film => film.id == req.params.id ); // on va créer la variable film directement dans la fonction et on va dire que
                                                                            // son id est celui entré dans l'URL
    if(indexFound < 0) return res.sendStatus(404);
    res.json(films[indexFound]);
});

// filtrer par durée

router.get('/',(req,res,next) =>{
    
    const orderByDuration = req?.query['minimum-duration'] ? req.query['minimum-duration']  : undefined; // les [] permettent d'accéder au propriété d'un objet en évitant l'opérateur "-"

    if(orderByDuration <=0)return res.sendStatus(400); // vérification du paramètre

    const films = parse(jsonDbPath,FILMS);

    let orderFilm;
    if(orderByDuration){
        orderFilm = [...films].filter(film => film.duration >= orderByDuration); // on filtre dans une copie du tableau tous les films plus grand que la variable orderByDuration
    }
    res.json(orderFilm ?? films); // on renvoie le filtre et s'il est undefined, on renvoie le tableau par défaut
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

    const films = parse(jsonDbPath,FILMS);

    const nextID = films.length +1;

    const newFilm = {
        id : nextID,
        title : title,
        duration : duration,
        budget : budget,
        link : link
    };

     const result = films.find(f => f.title === newFilm.title) // vérification d'un titre unique lors de l'ajout
     if(result) return res.sendStatus(409);

       films.push(newFilm);

       serialize(jsonDbPath,films);

    res.json(newFilm);
});

router.delete('/:id',(req,res,next) => {

    const films = parse(jsonDbPath,FILMS);

    const filmID = films.findIndex(film => film.id == req.params.id);

    if(filmID < 0)return res.sendStatus(404);

    const filmRemoveFromFILMS = films.splice(filmID,1); // renvoie d'un tableau contenant tous éléments supprimés (le chiffre est le nbr d'éléments derrière l'index)
    const filmRemove = filmRemoveFromFILMS[0];

    serialize(jsonDbPath,films);

    res.json(filmRemove);
});

router.patch('/:id',(req,res,index)=>{
    
    const title = req?.body?.title !==0 ? req.body.title : undefined; // vérification des paramètres
    const duration = req?.body?.duration !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link !== 0 ? req.body.link : undefined;

    if(!title && !duration && !budget && !link) return res.sendStatus(400);
    
    const films = parse(jsonDbPath,FILMS);

    const indexFilm = films.findIndex(f => f.id == req.params.id); // vérification de l'ID
    if(indexFilm < 0)return res.sendStatus(404);

    const updatedFilm = {...films[indexFilm],...req.body}; // on écrase les anciennes valeurs dans une copie du tableau
    films[indexFilm] = updatedFilm; // on met à jour les nouvelles valeurs dans le tableau au bon index

    serialize(jsonDbPath,films);

    res.json(updatedFilm);
});


router.put('/:id',(req,res) =>{
    
    const title = req?.body?.title !==0 ? req.body.title : undefined; // vérification des paramètres
    const duration = req?.body?.duration !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link !== 0 ? req.body.link : undefined;

    if(!title || !duration || !budget || !link) return res.sendStatus(400); // s'il manque un seul paramètre

     const films = parse(jsonDbPath,FILMS);

    const findId = films.findIndex(f =>f.id == req.params.id); // si l'on trouve l'ID, on met à jour, sinon on ajoute
    if(findId >= 0){ // findIndex ressort -1 lorsqu'elle ne trouve rien 
        const update = {...films[findId],...req.body};
        films[findId] = update;

        serialize(jsonDbPath,films);
        
        return res.json(update);
    }
    
        const newFilm = {
            id : Number(req.params.id), // on met l'ID entré dans l'URL lors de l'ajout
            title : title,
            duration : duration,
            budget : budget,
            link : link
        }

            films.push(newFilm);

            serialize(jsonDbPath,films);

     return res.json(newFilm);
        
});

module.exports = router;