// on a supprimé le tableau contenant tous les films (MOVIES), car avec le serialize, on les retient déjà dans l'API

 async function readAllMovies (){
  
  let films;
  try{ // '/api' sera remplacé par localhost:3000 donc le requête à l'API sera 'localhost:3000/films'
    const response = await fetch('/api/films'); // si la promesse marche, on reçoit le tableau de l'API avec tous les films

  if(!response.ok)throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
   films = await response.json();

  }catch(err){
    // eslint-disable-next-line no-console
    console.error('Error : ',err);
  }
  return films;
}

async function readOneMovie(id){
  let film;
  try{
    const response = await fetch(`/api/films/${id}`);
    if(!response.ok)throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    film = response.json();
  }catch(err){
    // eslint-disable-next-line no-console
    console.error('Error : ',err);
  }
  return film;
}

async function deleteOneMovie(id){

  const options = {
    method : 'DELETE',
    headers : {
      'Content-type' : 'applications/json',
    },
  };

  let deleteMovie;
  try{
    const response = await fetch(`/api/films/${id}`,options);

    if(!response.ok)throw new Error (`fetch error : ${response.status} : ${response.statusText}`);

     deleteMovie = await response.json();
  }catch(err){
    // eslint-disable-next-line no-console
    console.error('Error : ', err);
  }

  return deleteMovie;
}

async function updateOneFilm(id, title, duration, budget, link){

  const options = {
    method : 'PATCH',
    body : JSON.stringify({
      title,
      duration,
      budget,
      link
    }),
    headers : {
      'Content-type' : 'application/json',
    },
  };

  let updateMovie;
  try{
    const response = await fetch(`/api/films/${id}`,options);
    if(!response.ok)throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    updateMovie = response.json();
  }catch(err){
    // eslint-disable-next-line no-console
    console.error('Error : ',err);
  }
  return updateMovie;
}


module.exports = { readAllMovies, readOneMovie, deleteOneMovie, updateOneFilm}