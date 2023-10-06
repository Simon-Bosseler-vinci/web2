const express = require('express');
const {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm,
    updateAllPropertiesOrCreate
  } = require('../models/films');

const router = express.Router();

 /* router.get('/', (req, res, next) => {
    console.log('GET /films');
    res.json(FILMS); 
  });
  */

  // filtrer par ID
  
router.get('/:id',(req,res) => {
    const filmFound = readOneFilm(req.params.id);
    if(!filmFound) return res.sendStatus(404); // undefined = id non trouvé
    return res.json(filmFound);
});

// filtrer par durée

router.get('/',(req,res) =>{
    let duration;

    if(req?.query?.['minimum-duration']){ // si la requête contient une durée minimum, on change de string à number
        duration = Number(req.query['minimum-duration']); // les [] permettent d'accéder au propriété d'un objet en évitant l'opérateur "-"
    }else{
        duration = -1; // si l'on ne rentre pas 'minimum-duration' dans l'URL
    }

    const allFilmsOrdered = readAllFilms(duration);
    res.json(allFilmsOrdered);
});

// ajouter un film

router.post('/',(req,res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined; // vérification des paramètres entrés dans l'URL
    const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    if(!title || !duration || !budget || !link){
        return res.sendStatus(400);
    }

    const createFilm = createOneFilm(title,duration,budget,link);
    if(!createFilm) return res.sendStatus(409); // cas du titre unique
    return res.json(createFilm);
});

router.delete('/:id',(req,res) => {

    const deleteFilm = deleteOneFilm(req.params.id);
    if(!deleteFilm) return res.sendStatus(404);
    return res.json(deleteFilm);
});

router.patch('/:id',(req,res) => {
    
    const title = req?.body?.title !==0 ? req.body.title : undefined; // vérification des paramètres
    const duration = req?.body?.duration !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link !== 0 ? req.body.link : undefined;

    if(!title && !duration && !budget && !link) return res.sendStatus(400);
    

    const updatedFilm = updateOneFilm(req.params.id, {title,duration,budget,link});
    if(!updatedFilm) return res.sendStatus(404); // id pas trouvé
    return res.json(updatedFilm);
});


router.put('/:id',(req,res) =>{
    
    const title = req?.body?.title !==0 ? req.body.title : undefined; // vérification des paramètres
    const duration = req?.body?.duration !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link !== 0 ? req.body.link : undefined;

    if(!title || !duration || !budget || !link) return res.sendStatus(400); // s'il manque un seul paramètre

    
    const updateOrCreateFilm = updateAllPropertiesOrCreate(req.params.id,{title,duration,budget,link});
    return res.json(updateOrCreateFilm);    
});

module.exports = router;