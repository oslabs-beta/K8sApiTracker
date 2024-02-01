
const compareController = {};

compareController.compare = (req, res, next) => {
  const kubePug = res.locals.apiInfo;
  const clusterData = res.locals.clusterData;
  // Declare resultObj
  const resultObj = {};
  const checked = {};
  // Iterate through clusterData
  for (const object of clusterData){
    let found = false;
    if(kubePug.hasOwnProperty(object.kind)){
      if(object.apiVersion === kubePug[object.kind].version){
        object.newVersion = kubePug[object.kind].replacement.version;
        object.description = kubePug[object.kind].description;
        found = true;
      }
    }
    if (!found) {
      object.newVersion = false;
      object.description = false;
    }
    //! REPLACE THIS WHEN WE GET ACTUAL DEPRECATION STATUS
    // 4. Status: 'stable', 'updateAvailable', 'deprecated', 'noReplacement'
    object.deprecationStatus = 'stable';
  }
//   console.log('res.locals.clusterData', clusterData)
  return next();
}
// 
module.exports = compareController;