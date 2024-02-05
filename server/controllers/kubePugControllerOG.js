const kubePugController = {};
kubePugController.getApiInfo = (req, res, next) => {
  // console.log('Inside of kubePug controller');
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

        // console.log('apiObject.kind: ', apiObject.kind);

        // IS DEPRECATED
        // if (apiObject.hasOwnProperty("deprecated_version")) {
        //   // IF NO REPLACEMENT AVAILABLE
        //   if (!Object.values(apiObject.replacement).length) {
        //     // console.log('Object.values(apiObject.replacement): ', Object.values(apiObject.replacement))
        //     apiInfo[apiObject.kind].deprecationStatus = 'removed';

        //   }
        //   else {
        //     apiInfo[apiObject.kind].deprecationStatus = 'updateAvailable';
        //   }
        // }

        // // IS NOT DEPRECATED
        // else apiInfo[apiObject.kind].deprecationStatus = 'stable'

        // console.log(apiInfo[apiObject.kind].deprecationStatus)
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
