const fs = require("fs");

module.exports = (pathFile, options)=>{
    return new Promise((resolve, reject)=> {
      // Leer el archivo
      fs.readFile(pathFile, function(err, data){
        if (err){
          return reject(err);
        }
        resolve(data.toString());
      });
    });
    };