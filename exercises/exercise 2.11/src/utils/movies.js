const MOVIES = [
    {
      id: 1,
      title: "Harry Potter and the Sorcerer's Stone",
      duration: 152,
      budget: 125000000,
      link: 'https://www.example.com/harry-potter',
    },
    {
      id: 2,
      title: 'Star Wars: Episode IV - A New Hope',
      duration: 121,
      budget: 11000000,
      link: 'https://www.example.com/star-wars',
    },
    {
      id: 3,
      title: 'Inception',
      duration: 148,
      budget: 160000000,
      link: 'https://www.example.com/inception',
    },
    {
      id: 4,
      title: 'Jurassic Park',
      duration: 127,
      budget: 63000000,
      link: 'https://www.example.com/jurassic-park',
    },
    {
      id: 5,
      title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
      duration: 143,
      budget: 140000000,
      link: 'https://www.example.com/pirates-caribbean',
    }
];

function readAllMovie (){
    return MOVIES;
}

function addOneMovie (title,duration,budget,link){
    const nextId = MOVIES.length +1;

    const newMovie = {
        id : nextId,
        title,
        duration,
        budget,
        link
    }

    MOVIES.push(newMovie);
}

module.exports = {readAllMovie,addOneMovie}