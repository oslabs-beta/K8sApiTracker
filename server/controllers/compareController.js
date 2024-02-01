
const compareController = {};

compareController.compare = (req, res, next) => {
  const kubePug = res.locals.apiInfo;
  const clusterData = res.locals.clusterData;
  // Declare resultObj
  const resultObj = {};
  const checked = {};
  // Iterate through clusterData
  for (const object of clusterData) {
    let found = false;

    if (kubePug.hasOwnProperty(object.kind)) {
      if (object.apiVersion === kubePug[object.kind].version) {
        //! MATCH FOUND

        if (kubePug[object.kind].deprecationStatus === 'noReplacement') {
          //! DEPRECATED & NO REPLACEMENT
          object.newVersion = 'N/A';
        }
        else {
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