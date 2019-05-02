const mdLinks = require('../index.js');
describe('pathInserted', () => {
  it('should be a function', () => {
    expect(typeof mdLinks.pathInserted).toBe("function");
  });
  it('Should return false', () => {
    expect(mdLinks.pathInserted()).toBe(false);
  });
  it('should return true', () => {
    expect(mdLinks.pathInserted('./README.md')).toBe(true);
      });

});

describe("pathWorking", () =>{
  it("Should be false", () => {
       expect(mdLinks.pathWorking("./README.txt")).toBe(false);
   });
   it("Should be true", () => {
     expect(mdLinks.pathWorking("./README.md")).toBe(true);
   });
    });
  
  describe("pathDirectory", () =>{
  it("Should be true", () => {
   expect(mdLinks.pathDirectory("C:\\Users\\Liz\\Desktop\\LABORATORIA\\GDL002-md-links")).toBe(true);
   });
  it("Should be false", () => {
   expect(mdLinks.pathDirectory("./README.md")).toBe(false);
   });
   });
  
  describe("pathMd", () => {
  it("Should be true", () => {
  expect(mdLinks.pathMd("./README.md")).toBe(true);
  });
  it("Should be false", () => {
  expect(mdLinks.pathMd("./README.txt")).toBe(false);
  });
  });

describe("readingFile", () => {
  it("Should read the file", () => {
    expect(mdLinks.readingFile("./prueba.md")).toBe(true);
  });
});

// describe("urlify", () =>{
//   it("Should be true", ()=> {
//     expect(mdLinks.urlify("./README.md")).toBe(htmlLinks);
//   });
// });


const mdLinks = require('../md-links.js');

// EJEMPLOS PRUEBAS FUNCIONES ASINCRONAS
// describe('mdLinks', () => {

//   it('mdLinks debería ser una función', () => {
//       expect(typeof mdLinks).toBe('function');
//   });

//   it('mdLinks deberia retornar una promesa que resuelve un arreglo de objetos (links) para un archivo md', () => {
//   return expect(mdLinks('/home/diana/Documents/laboratoria/Proyectos/CDMX007-fe-md-links/test/prueba/README4.md', {validate:undefined,stats:undefined})).resolves.toHaveLength(3);
//   });

//   it('mdLinks deberia retornar una promesa que resuelve un arreglo de objetos (links) para un archivo md con ruta relativa', () => {
//   return expect(mdLinks('./test/prueba/README4.md', {validate:undefined,stats:undefined})).resolves.toHaveLength(3);
//   });

//   it('mdLinks deberia retornar una promesa que resuelve un arreglo de objetos (links) para un directorio', () => {
//   return expect(mdLinks('/home/diana/Documents/laboratoria/Proyectos/CDMX007-fe-md-links/test/prueba/', {validate:undefined,stats:undefined})).resolves.toHaveLength(15);
//   });

//   it('mdLinks deberias retornar un error cuando no se ingrese una ruta', () => {
//     return expect(Promise.reject(new Error('no has ingresado una ruta'))).rejects.toThrow('no has ingresado una ruta');
//   });


// });
