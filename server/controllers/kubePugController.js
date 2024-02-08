"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kubePugController = {
    getApiInfo: (req, res, next) => {
        // console.log('Inside of kubePug controller');
        fetch('https://kubepug.xyz/data/data.json')
            .then(apiInfo => apiInfo.json())
            .then((data) => {
            console.log('data', data);
            const apiInfo = {};
            for (const apiObject of data) {
                apiInfo[apiObject.kind] = {
                    version: apiObject.version,
                    replacement: apiObject.replacement,
                    description: apiObject.description
                };
            }
            ;
            res.locals.apiInfo = apiInfo;
            console.log('res.locals.apiInfo', res.locals.apiInfo);
            return next();
        })
            .catch(err => {
            return next(err);
        });
    }
};
module.exports = kubePugController;
