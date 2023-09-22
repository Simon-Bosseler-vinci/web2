var express = require('express');
var router = express.Router();

const FILMS = [
    {
        id : 1,
        title : "Harry Potter",
        duration : "2h",
        budget : 362000,
        link : "https://"
    },
    {
        id : 2,
        title : "Star Wars",
        duration : "1h49",
        budget : 529000,
        link : "https://"
    },
    {
        id : 3,
        title : "Indiana Jones - alexis le petit zizi",
        duration : "2h12",
        budget : 713000,
        link : "https://"
    }
]

router.get('/', (req, res, next) => {
    console.log('GET /films');
    res.json(FILMS);
  });

module.exports = router;