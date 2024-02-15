import { Request, Response, NextFunction } from 'express';
import { KubePugController, ApiObject, ApiInfo } from '../types'

const kubePugController: KubePugController = {
getApiInfo: (req: Request, res: Response, next: NextFunction) => {
  fetch('https://kubepug.xyz/data/data.json')
    .then(apiInfo => apiInfo.json())
    .then((data: ApiObject[]) => {
      const apiInfo: ApiInfo = {};
      for (const apiObject of data){
        apiInfo[apiObject.kind]  = {
          version: apiObject.version,
          replacement: apiObject.replacement,
          description: apiObject.description
        };
      }
      res.locals.apiInfo = apiInfo;
      return next();
    })
    .catch(err => {
        return next(err)
    })
}
}
 
module.exports = kubePugController;
