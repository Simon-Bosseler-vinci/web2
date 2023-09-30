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

    if(orderByDuration <=0)return res.sendStatus(400); // vérification du paramètre

    let orderFilm;
    if(orderByDuration){
        orderFilm = [...FILMS].filter(film => film.duration >= orderByDuration); // on filtre dans une copie du tableau tous les films plus grand que la variable orderByDuration
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

     const result = FILMS.find(f => f.title === newFilm.title) // vérification d'un titre unique lors de l'ajout
     if(result) return res.sendStatus(409);

       FILMS.push(newFilm);

    res.json(newFilm);
});

router.delete('/:id',(req,res,next) => {

    const filmID = FILMS.findIndex(film => film.id == req.params.id);

    if(filmID < 0)return res.sendStatus(404);
    
    const filmRemoveFromFILMS = FILMS.splice(filmID,1); // renvoie d'un tableau contenant tous éléments supprimés (le chiffre est le nbr d'éléments derrière l'index)
    const filmRemove = filmRemoveFromFILMS[0];

    res.json(filmRemove);
});

router.patch('/:id',(req,res,index)=>{
    
    const title = req?.body?.title !==0 ? req.body.title : undefined; // vérification des paramètres
    const duration = req?.body?.duration !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link !== 0 ? req.body.link : undefined;

    if(!title && !duration && !budget && !link) return res.sendStatus(400); 

    const indexFilm = FILMS.findIndex(f => f.id == req.params.id); // vérification de l'ID
    if(indexFilm < 0)return res.sendStatus(404);

    const updatedFilm = {...FILMS[indexFilm],...req.body}; // on écrase les anciennes valeurs dans une copie du tableau
    FILMS[indexFilm] = updatedFilm; // on met à jour les nouvelles valeurs dans le tableau au bon index

    res.json(updatedFilm);
});


router.put('/:id',(req,res) =>{
    
    const title = req?.body?.title !==0 ? req.body.title : undefined; // vérification des paramètres
    const duration = req?.body?.duration !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link !== 0 ? req.body.link : undefined;

    if(!title || !duration || !budget || !link) return res.sendStatus(400); // s'il manque un seul paramètre

     
         
    const findId = FILMS.findIndex(f =>f.id == req.params.id); // si l'on trouve l'ID, on met à jour, sinon on ajoute
    if(findId >= 0){ // findIndex ressort -1 lorsqu'elle ne trouve rien 
        const update = {...FILMS[findId],...req.body};
        FILMS[findId] = update;
        return res.json(update);
    }
    
        const newFilm = {
            id : Number(req.params.id),
            title : title,
            duration : duration,
            budget : budget,
            link : link
        }

            FILMS.push(newFilm);

     return res.json(newFilm);
        
});

module.exports = router;