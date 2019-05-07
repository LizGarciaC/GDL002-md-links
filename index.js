const fs = require("fs");
const path = require("path");
const colors = require("colors");
const pathFile = process.argv[2];
const request = require("request");
const program = require("commander");


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
function urlExtract(data) {
  const mdLinkRgEx = /\[(.+?)\]\((.+?\))/g;
  const mdLinkRgEx2 = /\[(.+?)\]\((.+?)\)/;
  let allLinks = data.match(mdLinkRgEx);
  let htmlLinks = [];
  for (var x in allLinks) {
    let grpdDta = mdLinkRgEx2.exec(allLinks[x]);
    let grupoData = {
      href: grpdDta[2],
      text: grpdDta[1],
      file: pathFile,
      message: ''
    };
    htmlLinks.push(grupoData);
  }
  // console.log(htmlLinks.length);
  // console.log(htmlLinks);
  return (htmlLinks);

};

const links = (pathFile, options) => {
  return new Promise((resolve, reject) => {
    // Leer el archivo
    fs.readFile(pathFile, function (err, data) {
      if (err) {
        return reject(err);
      }

      let htmlLinks = urlExtract(data.toString());
      let mainMessage = "Links encontrados: " + htmlLinks.length
      console.log(mainMessage.yellow);
      // Válidar Links encontrados.
      for (let i = 0; i < htmlLinks.length; i++) {

        request(htmlLinks[i].href, (error, response, body) => {
          if (error) {
            htmlLinks[i].message = 'No se encontró la página';
            htmlLinks[i].pathExist = false;
            if (options.validate){
              console.log("     " + htmlLinks[i].href.white + " " + htmlLinks[i].message.red);
            } else {
              console.log("     " + htmlLinks[i].href.white);
            }
          }
          else {

            const statusCode = response.statusCode;
            // const contentType = res.headers['content-type'];

            if (statusCode === 200) {
              htmlLinks[i].message = 'Página válida ';
              htmlLinks[i].pathExist = true;
              if (options.validate){
                console.log("     " + htmlLinks[i].href.white + " " + htmlLinks[i].message.green);
              } else {
                console.log("     " + htmlLinks[i].href.white);
              }
            }
            else {
              htmlLinks[i].message = 'página inválida';
            }
          }
        });
      }

      resolve(htmlLinks);
    });
  });
};

// links(pathFile, null).then(
//   (htmlLinks) => { // On Success

//   },
//   (err) => { // On Error
//     console.error(err);
//   }
// );

var fnMain = ()=>{
program
  .version('1.0.0')
  .option('-v, --validate', 'Valida si el link funciona o no')
  .option('-s, --stats', 'Muestra información estadística sobre los links')
  //Se le enseña a la libreria command que está esperando un path o ruta
  .arguments('<path>')
  // Si encuentra el path entonces ejecuta la acción que se le solicita
  .action((path) => {
    links(path, { "validate": program.validate, "stats": program.stats });
    // .then((result) => {
    //   console.log("Links encontrados: ".white + result.length);
    //   for (var link = 0; link < result.length; link++) {
    //     console.log("     " + result[link].href.white + "  " + result[link].message.green);
    //   }
    // });
  })
  .parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
};

if (require.main === module){
  fnMain();
}
//Función para leer archivo

module.exports = {
  // "pathInserted": pathInserted,
  // "pathWorking": pathWorking,
  // "pathDirectory": pathDirectory,
  // "pathMd": pathMd,
  // "urlExtract": urlExtract,
  "mdLinksLg": links
};









