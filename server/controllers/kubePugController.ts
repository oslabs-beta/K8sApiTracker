import { Request, Response, NextFunction } from 'express';

//define getApiInfo type
type GetApiInfo = ( req: Request, res: Response, next: NextFunction ) => void;

//define controller type
type KubePugController = {
  getApiInfo: GetApiInfo;
}
type Kind = {
  version: string;
  replacement: {
    group: string;
    version: string;
    kind: string;
  } | {} //union type
  description: string;
}

type ApiObject = Record<string, any>; //the object keys are in type of string, while the value can be of any type

type ApiInfo = {
    [key: string]: Kind //index signatures
  };

const kubePugController: KubePugController = {
getApiInfo: (req: Request, res: Response, next: NextFunction) => {
  // console.log('Inside of kubePug controller');
  fetch('https://kubepug.xyz/data/data.json')
    .then(apiInfo => apiInfo.json())
    .then((data: ApiObject[]) => {
      console.log('data', data);
      const apiInfo: ApiInfo = {};
      for (const apiObject of data){
        apiInfo[apiObject.kind]  = {
          version: apiObject.version,
          replacement: apiObject.replacement,
          description: apiObject.description
        };
      };
      res.locals.apiInfo = apiInfo;
      console.log('res.locals.apiInfo', res.locals.apiInfo)
      return next();
    })
    .catch(err => {
        return next(err)
    })
}
}
 
module.exports = kubePugController;
