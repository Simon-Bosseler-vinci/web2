

 async function readAllMovie (){
  const response = await fetch('/api/films');
  if(!response.ok)throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  const films = await response.json();
  // eslint-disable-next-line no-console
  console.log('Affichage film : ', films);
    return films;
}


module.exports = {readAllMovie}