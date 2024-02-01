
const compareController = {};

compareController.compare = (req, res, next) => {
  console.log('Inside of compare controller');
  const kubePug = res.locals.apiInfo;
  const clusterData = res.locals.clusterData;
  //     
  // Iterate through clusterData
  for (const object of clusterData) {
    let found = false;

    // console.log('clusterData Kind: ', object.kind);
    // console.log('object.apiVersion: ', object.apiVersion);
    // console.log('---------------------------');


    if (kubePug.hasOwnProperty(object.kind)) {

      if (object.apiVersion === kubePug[object.kind].version) {
        //! MATCH FOUND

        if (!Object.values(kubePug[object.kind].replacement).length) {
          console.log('DEPRECATED and NO REPLACEMENT');
          //! DEPRECATED & NO REPLACEMENT
          object.kind.deprecationStatus = 'noReplacement';
          object.newVersion = false;
        }
        else {
          console.log('DEPRECATED with REPLACEMENT AVAILABLE');
          //! DEPRECATED w/ REPLACEMENT AVAILABLE
          object.newVersion = kubePug[object.kind].replacement.version;
        }

        // Add kubePug data properties to clusterData
        object.description = kubePug[object.kind].description;
        object.deprecationStatus = kubePug[object.kind].deprecationStatus;
        found = true;
      }

    }

    // IF not match, make sure clusterData still has appropriate properties
    if (!found) {
      object.newVersion = false;
      object.description = false;
      object.deprecationStatus = 'stable';
    }
  }
  //   console.log('res.locals.clusterData', clusterData)
  return next();
}
// 
module.exports = compareController;