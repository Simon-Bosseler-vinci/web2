
const path = require('node:path');
const { v4 } = require('uuid');
const { serialize, parse } = require('../utils/json');


const jsonDbPath = path.join(__dirname, '/../data/texts.json');

const TEXTES = [
    {
        id : "caaf748a-0fc6-4fea-b7a6-750e33426e12",
        content : "Apprendre à taper sur un clavier à l'aveugle",
        level : "easy"
    },
    {
        id : "7456fd08-6405-4831-96b2-c80722ba9924",
        content : "Apprendre à taper en un temps chronometrer",
        level : "medium"
    },
    {
        id : "0fb14334-e23d-4300-a3f1-03e6f8634ad1",
        content : "Taper un texte imposé le plus vite",
        level : "hard"
    }
];

function readAllTexte(level){
    const textes = parse(jsonDbPath,TEXTES);

    const tabOfLevel = ["easy","medium","hard"];
    let orderTexte;
    if(!level){
        orderTexte = textes; // cas d'aucune entrée dans l'URL
    }else if(tabOfLevel.includes(level)){
            orderTexte = textes.filter( t => t.level === level); // cas du level trouvé dans le tableau
        }else{
            orderTexte = textes; // si l'entrée n'est pas dans le tableau
        }
    return orderTexte;
};

function readOneTexte(id){
    const textes = parse(jsonDbPath,TEXTES);

    const texteFound = textes.findIndex(texte => texte.id === id);
    if(texteFound < 0 )return undefined; // cas de l'ID non trouvé

    return textes[texteFound];
};

function createOneTexte(content, level){

    const textes = parse(jsonDbPath,TEXTES);

    const newTexte = {
        id : v4(),
        content,
        level
    };

    textes.push(newTexte);
    
    serialize(jsonDbPath,textes);

    return newTexte;
};

function deleteOneTexte(id){
    const textes = parse(jsonDbPath,TEXTES);

    const deleteTexte = textes.findIndex(texte => texte.id === id);
    if(deleteTexte < 0)return undefined;

    const texteRemoveFromTEXTES = textes.splice(deleteTexte,1); // renvoie d'un tableau contenant tous éléments supprimés (le chiffre est le nbr d'éléments derrière l'index)
    const texteRemove = texteRemoveFromTEXTES[0];

    serialize(jsonDbPath,textes);

    return texteRemove;
};

function updatedOrCreateTexte(id,propertiesToUpdate){
    const textes = parse(jsonDbPath,TEXTES);

    const findId = textes.findIndex(texte => texte.id === id);

    if(findId < 0){ // cas de l'ID inconnue, on créé à partir d'ici
        const newTexte = {
            id,
            content : propertiesToUpdate.content,
            level : propertiesToUpdate.level
        }
        textes.push(newTexte);
        serialize(jsonDbPath,textes);
        return newTexte;
    }
        const update = {...textes[findId],...propertiesToUpdate};
        textes[findId] = update;
        serialize(jsonDbPath,textes);
        return update;
    
};

module.exports = {
    readAllTexte,
    readOneTexte,
    createOneTexte,
    deleteOneTexte,
    updatedOrCreateTexte
}
