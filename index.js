const fs = require("fs");
const path = require("path");
const pathFile = process.argv[2];
const request = require("request");


//funcion que verifica si el campo esta vacio ó lleno
function pathInserted(pathFile) {
  if (pathFile == undefined) {
    console.log("false");
    return false
  }
  else {
    return true
  }
};

//función para saber si la ruta existe
function pathWorking(pathFile) {
  if (fs.existsSync(pathFile)) {
    console.log("true");
    return true
  }
  else {
    console.log("false");
  }
  return false
};

//función para verificar si la ruta es un directorio
function pathDirectory(pathFile) {
  if (fs.statSync(pathFile).isDirectory()) {
    return true
  } else {
    return false
  }
};

//función que revisa si es un .md
function pathMd(pathFile) {
  if (path.extname(pathFile) === ".md") {
    return true
  }
  else {
    return false
  }
};

//Función para extraer los links
function urlify(data) {
  const mdLinkRgEx = /\[(.+?)\]\((.+?\))/g;
  const mdLinkRgEx2 = /\[(.+?)\]\((.+?)\)/;
  let allLinks = data.match(mdLinkRgEx);
  let htmlLinks = [];
  for (var x in allLinks) {
    let grpdDta = mdLinkRgEx2.exec(allLinks[x]);
    let grupoData = {
      href: grpdDta[2],
      text: grpdDta[1],
      file: pathFile
    };
    htmlLinks.push(grupoData);
  }
  console.log(htmlLinks.length);
  console.log(htmlLinks);
  return (htmlLinks);

};

const links = (pathFile, options) => {
  return new Promise((resolve, reject) => {
    // Leer el archivo
    fs.readFile(pathFile, function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data.toString());
    });
  });
};

const readFileResult = links(pathFile, null);

//Función para leer archivo
readFileResult.then(
  (data) => { // On Success
    console.log("Links Encontrados:");
    let htmlLinks = urlify(data);

// Válidar Links encontrados.



    for (let i = 0; i < htmlLinks.length; i++) {

      request(htmlLinks[i].href, (error, response, body ) => {
        if (error){
          console.log(htmlLinks[i].href + '  No se encontró la página');
          htmlLinks[i].pathExist=false;
        }
        else{
          
        const statusCode = response.statusCode;
        // const contentType = res.headers['content-type'];

        if (statusCode === 200){
          console.log(htmlLinks[i].href + '  Página válida ');
          htmlLinks[i].pathExist=true;
        }
        else{
          console.log('página inválida');
        }
      }
        
      });
    }



  },
  (err) => { // On Error
    console.error(err);
  }
);


module.exports = {
  "pathInserted": pathInserted,
  "pathWorking": pathWorking,
  "pathDirectory": pathDirectory,
  "pathMd": pathMd,
  "urlify": urlify,
  "readFileResult": readFileResult,
  "links": links

};









