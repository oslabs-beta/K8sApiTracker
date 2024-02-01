const kubePugController = {};
kubePugController.getApiInfo = (req, res, next) => {
  fetch('https://kubepug.xyz/data/data.json')
    .then(apiInfo => apiInfo.json())
    .then(data => {
      const apiInfo = {};

      for (const apiObject of data) {
        apiInfo[apiObject.kind] = {
          version: apiObject.version,
          replacement: apiObject.replacement,
          description: apiObject.description
        }
      }
      
      // console.log('apiInfo', apiInfo)
      res.locals.apiInfo = apiInfo;
      return next();
    })
    .catch(err => next(err))
};


// catControllers.deleteCat = (req, res, next) => {
//   //get id off url
//   const catName = req.params.catName;
//   //find the note and delete it
//   Cat.findOneAndDelete(catName)
// };    

module.exports = kubePugController;
