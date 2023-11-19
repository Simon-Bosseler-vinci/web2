import { clearPage } from '../../utils/render';

const HomePage = () => {
  clearPage();
  const main = document.querySelector('main');
  const form = document.createElement('form');
  main.appendChild(form);
  askQuestions();
};


function askQuestions() {
  fetch('http://localhost:3000/questions')
    .then((response) => {
      if (!response.ok)
        throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      return response.json();
    })
    .then((questions) => {
      // si on a une promesse, on renvoie toutes les questions dans une array
      const randomQuestion = generateThreeRandomQuestions(questions); // via la méthode generate.. on sélectionne trois questions aléatoirement

      randomQuestion.forEach((question) => {
        renderRandomQuestion(question.question, question.answers);
      });
    })
    .catch((err) => {
      console.error('HomePage::error: ', err);
    });
}

function generateThreeRandomQuestions(questionArray) {
  const potientialQuestion = [...questionArray]; // les questions qui sont probablement choisies

  const randomQuestions = [];

  for (let i = 0; i < 3; i += 1) {
    const randomIndex = Math.floor(Math.random() * potientialQuestion.length); // prend un indice aléatoire dans le tableau passé en paramètre (qui est le tableau de la promesse)
    const randomQuestion = potientialQuestion[randomIndex]; // on prend la question dans la table à l'index aléatoire
    potientialQuestion.slice(randomIndex, 1); // on supprime du tableau la question aléatoire
    randomQuestions.push(randomQuestion); // on met dans le tableau que l'on va renvoyer la question tirée aléatoirement
  }
  return randomQuestions;
}

function renderRandomQuestion(questionText, answerArray) {
  const main = document.querySelector('main');

  const question = document.createElement('h2');
  question.innerText = questionText;

  const form = document.querySelector('form');

  form.appendChild(question);

  answerArray.map((answer) => {
    const input = document.createElement('input');

    input.type = 'radio';
    input.name = questionText;
    input.id = answer.text;

    const label = document.createElement('label');

    label.innerText = answer.text;
    label.setAttribute('for', answer.text);

    form.appendChild(input);
    form.appendChild(label);

    const br = document.createElement('br');

    form.appendChild(br);

    return true;
  });

  main.appendChild(form);
}

export default HomePage;
