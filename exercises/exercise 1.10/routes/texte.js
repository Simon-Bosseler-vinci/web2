const express = require('express');

const {
  readAllTexte,
  readOneTexte,
  createOneTexte,
  deleteOneTexte,
  updatedOrCreateTexte,
} = require('../models/texte');

const router = express.Router();

router.get('/', (req, res) => {
  let level;
  if (req?.query?.value) { // cas d'affichage d'une valeur de niveau entrée dans l'URL
    level = req.query.value;
  } else {
    level = undefined; // cas d'affichage par défaut
  }

  const allTexte = readAllTexte(level);
  if(!allTexte) return res.sendStatus(400); // cas d'un level non trouvé dans le tableau
  return res.json(allTexte);
});

router.get('/:id', (req, res) => {
  const texteFound = readOneTexte(req.params.id);
  if (!texteFound) return res.sendStatus(404);
  return res.json(texteFound);
});

router.post('/', (req, res) => {
  const content = req?.body?.content !== 0 ? req.body.content : undefined; // vérification de la longueur des paramètres entrés 
  const level = req?.body?.level !== 0 ? req.body.level : undefined;

  if (!content || !level) {
    return res.sendStatus(400);
  }

  const newTexte = createOneTexte(content, level);
  if(!newTexte) return res.sendStatus(409);
  return res.json(newTexte);
});

router.delete('/:id', (req, res) => {
  const deleteTexte = deleteOneTexte(req.params.id);
  if (!deleteTexte) return res.sendStatus(404);
  return res.json(deleteTexte);
});

router.put('/:id', (req, res) => {
  const content = req?.body?.content ? req.body.content : undefined;
  const level = req?.body?.level ? req.body.level : undefined;

  if (!content || !level) return res.sendStatus(400); // Un seul paramètre vide, erreur

  const newTexte = updatedOrCreateTexte(req.params.id, { content, level });
  return res.json(newTexte);
});

module.exports = router;
