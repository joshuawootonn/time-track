

  // exports.findOne = (asdf,id) => {
  //   console.log("findone",asdf);
  // }
  
  // exports.create = (asdf,data) => {
  //   console.log("create",asdf);
  // }

  module.exports = (db) => {
    const findOne = (id) => {
         console.log("find")
    }
 
    const create = (data) => {
        console.log("create")
    }
 
    return Object.create({
      findOne,
      create,
    })
 } 