import { Request, Response, NextFunction } from 'express';

const compareController = {

  compare: (req: Request, res: Response, next: NextFunction) => {
    const kubePug = res.locals.apiInfo;
    const clusterData = res.locals.helmData;
    // Iterate through clusterData objects
    for (const object of clusterData) {
      let found: boolean = false;

      // If kubePug object containes the current object
      if (kubePug.hasOwnProperty(object.kind)) {

        // If current object that's matched inside of kubePug also has the same api version
        if (object.apiVersion === kubePug[object.kind].version) {
          found = true;

          // If replacement is empty, set newVersion to false and deprecationStatus to "removed"
          if (!Object.values(kubePug[object.kind].replacement).length) {
            object.newVersion = false;
            object.deprecationStatus = 'removed';
            object.description = kubePug[object.kind].description;
          }

          // If replacement is available, set newVersion to it's data and deprecationStatus tp "updateAvailable"
          else {
            object.newVersion = kubePug[object.kind].replacement.version;
            object.deprecationStatus = 'updateAvailable';
            object.description = kubePug[object.kind].description;
          }
        }
      }

      // IF not match, make sure clusterData still has appropriate properties
      if (!found) {
        object.newVersion = false;
        object.description = false;
        object.deprecationStatus = 'stable';
      }
    }

    res.locals.helmData = clusterData;

    return next();
  }

};

// 
export default compareController;
