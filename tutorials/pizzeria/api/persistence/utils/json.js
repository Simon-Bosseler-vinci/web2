const fs = require('fs');

/**
 * Parse items given in a .json file
 * @param {String} filePath - path to the .json file
 * If the file does not exist or it's content cannot be parsed as JSON data,
 * use the default data.
 * @param {Array} defaultArray - Content to be used when the .json file does not exists
 * @returns {Array} : the array that was parsed from the file (or defaultArray)
 */
function parse(filePath, defaultArray = []) { // sert à vérifier si le fichier donné est existant ou non, si non, on renvoie un tableau vide, si oui, on renvoie le fichier
  if (!fs.existsSync(filePath)) return defaultArray; // on lira dans un fichier json et non dans un fichier JS
  const fileData = fs.readFileSync(filePath);
  try {
    // parse() Throws a SyntaxError exception if the string to parse is not valid JSON.
    return JSON.parse(fileData); // on renvoie le bon fichier
  } catch (err) {
    return defaultArray;
  }
}

/**
 * Serialize the content of an Object within a file
 * @param {String} filePath - path to the .json file
 * @param {Array} object - Object to be written within the .json file.
 * Even if the file exists, its whole content is reset by the given object.
 */
function serialize(filePath, object) { // sert à écrire dans le fichier passé dans le premier paramètre, l'objet mis en second paramètre
  const objectSerialized = JSON.stringify(object); // on conserve alors les données (sérilisation) lors des modifications
  createPotentialLastDirectory(filePath);
  fs.writeFileSync(filePath, objectSerialized); // on écrit dans le fichier l'objet à la forme Json
}

/**
 *
 * @param {String} filePath - path to the .json file
 */
function createPotentialLastDirectory(filePath) {
  const pathToLastDirectory = filePath.substring(0, filePath.lastIndexOf('/'));

  if (fs.existsSync(pathToLastDirectory)) return;

  fs.mkdirSync(pathToLastDirectory);
}

module.exports = { parse, serialize };
