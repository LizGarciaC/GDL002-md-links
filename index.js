var program = require('commander');
program
  .version('1.0.0')
  .option('-v, --validate', 'Valida si el link funciona o no')
  .option('-s, --stats', 'Muestra información estadística sobre los links')
  //Se le enseña a la libreria command que está esperando un path o ruta
  .arguments('<path>')
  // Si encuentra el path entonces ejecuta la acción que se le solicita
  .action((path)=>{
    console.log(path);
  })
  .parse(process.argv);


//program.help();



module.exports = () => {
  // ...
};
