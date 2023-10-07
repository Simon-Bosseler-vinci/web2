const path = require('node:path');
// const { v4 } = require('uuid'); // permet de générer des id de grande taille
const { serialize, parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/texts.json');

const TEXTES = [
  {
    id: '1',
    content: "Apprendre à taper sur un clavier à l'aveugle",
    level: 'easy',
  },
  {
    id: '2',
    content: 'Apprendre à taper en un temps chronometrer',
    level: 'medium',
  },
  {
    id: '3',
    content: 'Taper un texte imposé le plus vite',
    level: 'hard',
  },
];

function readAllTexte(level) {
  const textes = parse(jsonDbPath, TEXTES); // récupération du fichier ou du tableau par défault

  const tabOfLevel = ['easy', 'medium', 'hard'];
  let orderTexte;
  if (!level) { // cas d'aucune entrée dans l'URL (lecture simple de tous les textes)
    orderTexte = textes; 
  } else if (tabOfLevel.includes(level)) {
    orderTexte = textes.filter((t) => t.level === level); // cas du level trouvé dans le tableau
  } else {
    return undefined;
  }
  return orderTexte;
}

function readOneTexte(id) {
  const textes = parse(jsonDbPath, TEXTES);

  const texteFound = textes.findIndex((texte) => texte.id === id);
  if (texteFound < 0) return undefined; // cas de l'ID non trouvé

  return textes[texteFound];
}

function createOneTexte(content, level) {
  const textes = parse(jsonDbPath, TEXTES);
  
const nextID = textes.length +1 ;
  const newTexte = {
    id: String(nextID), 
    content,
    level,
  };

  const sameID = textes.find(texte => texte.id === newTexte.id);
  if(sameID) return undefined; // cas du contenu similaire

  textes.push(newTexte);

  serialize(jsonDbPath, textes);

  return newTexte;
}

function deleteOneTexte(id) {
  const textes = parse(jsonDbPath, TEXTES);

  const deleteTexte = textes.findIndex(texte => texte.id === id);
  if (deleteTexte < 0) return undefined;

  const texteRemoveFromTEXTES = textes.splice(deleteTexte, 1); // renvoie d'un tableau contenant tous éléments supprimés (le chiffre est le nbr d'éléments derrière l'index)
  const texteRemove = texteRemoveFromTEXTES[0];

  serialize(jsonDbPath, textes);

  return texteRemove;
}

function updatedOrCreateTexte(id, propertiesToUpdate) {
  const textes = parse(jsonDbPath, TEXTES);

  const findId = textes.findIndex((texte) => texte.id === id);

  if (findId < 0) {
    // cas de l'ID inconnue, on créé à partir d'ici
    const newTexte = {
      id,
      content: propertiesToUpdate.content,
      level: propertiesToUpdate.level,
    };
    textes.push(newTexte);
    serialize(jsonDbPath, textes);
    return newTexte;
  }
  const update = { ...textes[findId], ...propertiesToUpdate };
  textes[findId] = update;
  serialize(jsonDbPath, textes);
  return update;
}

module.exports = {
  readAllTexte,
  readOneTexte,
  createOneTexte,
  deleteOneTexte,
  updatedOrCreateTexte,
};
