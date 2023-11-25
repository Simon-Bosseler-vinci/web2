// on a supprimé le tableau contenant tous les films (MOVIES), car avec le serialize, on les retient déjà dans l'API

 async function readAllMovie (){
  const response = await fetch('/api/films'); // si la promesse marche, on reçoit le tableau de l'API avec tous les films 
  if(!response.ok)throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const films = await response.json();
  // eslint-disable-next-line no-console
  console.log('Affichage films : ', films);
    return films; // on renvoie tous le tableau
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


module.exports = {readAllMovie, deleteOneMovie}