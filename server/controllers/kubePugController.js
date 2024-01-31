const kubePugController = {};
kubePugController.getApiInfo = (req, res, next) => {
  fetch('https://kubepug.xyz/data/data.json')
    .then(apiInfo => 
      apiInfo.json())
    .then(data => {
      // console.log('data', data)
      const apiCache = {};
      const apiInfo = []
      const keys = ['version', 'kind', 'description', 'introduced_version', 'deprecated_version', 'removed_version','replacement'];
      for (const apiObject of data) {
      //  console.log('apiObject', apiObject)
        for (const key in apiObject){
          if(keys.includes(key)){
            apiCache[key] = apiObject[key]
          }
          apiInfo.push(apiCache)
        }
<<<<<<< HEAD
      }
      // console.log('apiCache', apiCache)
      console.log('apiInfo', apiInfo)
      res.locals.apiInfo = apiInfo;
      return next();
    })
    .catch(err => 
      next(err)
    )
}

=======
        // Object.assign(apiInfo, apiObjectInfo);
      }
      console.log('apiCache', apiCache)
      console.log('apiInfo', apiInfo)
    })
    .catch(err => {
      next(err);
    })
}

kubePugController.getApiInfo()
>>>>>>> 894bfdf7989438fb7860cc7f6d5b2f6a841df2de

// catControllers.deleteCat = (req, res, next) => {
//   //get id off url
//   const catName = req.params.catName;
//   //find the note and delete it
//   Cat.findOneAndDelete(catName)
// };    

module.exports = kubePugController;
