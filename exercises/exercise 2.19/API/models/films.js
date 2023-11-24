const { serialize, parse } = require('../utils/json');

const jsonDbPath = `${__dirname  }/../data/films.json`;

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

function readAllFilms(duration){ // affiche tous les pizzas selon leur durée, ou par défault

    const films = parse(jsonDbPath,FILMS);

    let orderFilms
    if(duration === -1){
        orderFilms = films; // si l'on ne trie pas sur la durée, on renvoie le tableau par défault
    }else{
        orderFilms = films.filter(film => film.duration >= duration);
    }
    return orderFilms;
}

function readOneFilm(id){

    const films = parse(jsonDbPath,FILMS); // on recherche le fichier, si pas trouvé on renvoie FILMS, sinon on renvoie le fichier contentant les modifs

    const idParam = Number(id); // conversion d'un string en Number
    const indexFound = films.findIndex( film => film.id === idParam ); // le triple égal vérifie la valeur + le type 

    if(indexFound < 0) return undefined; // findIndex renvoie -1 si pas trouvé
    return films[indexFound];
}

function createOneFilm(title,duration,budget,link){

    const films = parse(jsonDbPath,FILMS);

    const nextID = films.length +1;

    const newFilm = {
        id : nextID,
        title,
        duration,
        budget,
        link
    };

    const result = films.find(f => f.title === newFilm.title) // vérification d'un titre unique lors de l'ajout
    if(result) return undefined;

    films.push(newFilm);

       serialize(jsonDbPath,films);

       return newFilm;
}

function deleteOneFilm(id){

    const films = parse(jsonDbPath,FILMS);

    const idParam = Number(id);
    const filmID = films.findIndex(film => film.id === idParam); 
    if(filmID < 0) return undefined;

    const filmRemoveFromFILMS = films.splice(filmID,1); // renvoie d'un tableau contenant tous éléments supprimés (le chiffre est le nbr d'éléments derrière l'index)
    const filmRemove = filmRemoveFromFILMS[0];

    serialize(jsonDbPath,films);

    return filmRemove;
}

function updateOneFilm(id, propertiesToUpdate){

    const films = parse(jsonDbPath,FILMS);
    
    const idParam = Number(id);
    const indexFilm = films.findIndex(f => f.id === idParam); // vérification de l'ID (le triple égal vérifie le type en plus de la valeur => double égal = la valeur)
    if(indexFilm < 0)return undefined;

    const updatedFilm = {...films[indexFilm],...propertiesToUpdate}; // on écrase les anciennes valeurs dans une copie du tableau
    films[indexFilm] = updatedFilm; // on met à jour les nouvelles valeurs dans le tableau au bon index

    serialize(jsonDbPath,films);

    return updatedFilm;
}

function updateAllPropertiesOrCreate(id, propertiesToUpdate){

    const films = parse(jsonDbPath,FILMS);

    const idParam = Number(id);
    const findId = films.findIndex(f =>f.id === idParam); // si l'on trouve l'ID, on met à jour, sinon on ajoute
    if(findId >= 0){ // findIndex ressort -1 lorsqu'elle ne trouve rien 
        const update = {...films[findId],...propertiesToUpdate};
        films[findId] = update;

        serialize(jsonDbPath,films);
        
        return update;
 }

 const newFilm = {
    id : idParam, // on met l'ID entré dans l'URL lors de l'ajout
    title : propertiesToUpdate.title,
    duration : propertiesToUpdate.duration,
    budget : propertiesToUpdate.budget,
    link : propertiesToUpdate.link
}

    films.push(newFilm);

    serialize(jsonDbPath,films);

  return newFilm;
}



module.exports = {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm,
    updateAllPropertiesOrCreate
  };