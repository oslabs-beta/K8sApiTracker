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

        // IS DEPRECATED
        if (apiObject.hasOwnProperty("deprecated_version")) {

          if (!Object.values(apiObject.replacement).length) {

            apiInfo[apiObject.kind].deprecationStatus = 'noReplacement';

          }
          apiInfo[apiObject.kind].deprecationStatus = 'updateAvailable';
        }

        // IS NOT DEPRECATED
        else apiInfo[apiObject.kind].deprecationStatus = 'stable'
      }

      console.log('apiInfo', apiInfo)
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
