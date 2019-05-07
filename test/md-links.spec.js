const { links, 
  pathInserted,
  pathWorking,
  pathDirectory,
  pathMd,
  urlExtract} = require('../index.js');

describe('pathInserted', () => {
  it('should be a function', () => {
    expect(typeof pathInserted).toBe("function");
  });
  it('Should return false', () => {
    expect(pathInserted()).toBe(false);
  });
  it('should return true', () => {
    expect(pathInserted('./README.md')).toBe(true);
      });

});

describe("pathWorking", () =>{
  it("Should be false", () => {
       expect(pathWorking("./README.txt")).toBe(false);
   });
   it("Should be true", () => {
     expect(pathWorking("./README.md")).toBe(true);
   });
    });
  
  describe("pathDirectory", () =>{
  it("Should be true", () => {
   expect(pathDirectory("C:\\Users\\Liz\\Desktop\\LABORATORIA\\GDL002-md-links")).toBe(true);
   });
  it("Should be false", () => {
   expect(pathDirectory("./README.md")).toBe(false);
   });
   });
  
  describe("pathMd", () => {
  it("Should be true", () => {
  expect(pathMd("./README.md")).toBe(true);
  });
  it("Should be false", () => {
  expect(pathMd("./README.txt")).toBe(false);
  });
  });
  

// describe("readFile", () => {
//   it("Should read the file", () => {
//     expect(links("./prueba.md")).toBe(Object);
//   });
// });


// describe("urlExtract", () =>{
//   it("Should be true", ()=> {
//     expect(mdLinksLg.urlExtract("./README.md")).toBe(htmlLinks);
//   });
// });

