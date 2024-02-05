const { glob } = require('glob');
const fs = require('fs');
const path = require('path');

const dependencyScraperController = {};

dependencyScraperController.getDependencies = (req, res, next) => {
  // invokes glob to crawl through cwd and returns an array of yaml filenames
  const getYaml = async () => {
    try {
      const options = {
        cwd: path.resolve(__dirname, '../../../'),
        absolute: true,
        ignore: 'node_modules/**'
      };
      const response = await glob('**/*.yaml', options);
      console.log(response);
      return response;
    }
    catch(e) {
        console.log('error')
    }
  };

  getYaml()
    .then((data) => {
      try {
        // create array to hold api data
        const dependencies = [];
        for(const file of data) {
            const obj = {};
            const content = fs.readFileSync(file, 'utf-8');
            // const content = fs.readFileSync(path.resolve(__dirname, '../../../'), 'utf-8');              
            // console.log(content);
            //add all properties to an object using regex to scrape yaml file for values
            const properties = ['apiVersion', 'kind', 'name', 'namespace', 'image'];
            const defaults = ['NA', 'NA', 'NA', 'Default', 'NA'];
            for (let i = 0; i < properties.length; i++){
                try {
                    const version = new RegExp(`${properties[i]}:.*`);
                    let array = version.exec(content);
                    obj[properties[i]] = array[0];                        
                }
                catch {
                    obj[properties[i]] = defaults[i]; // if the pattern is not available, use the default
                }
            };
            dependencies.push(obj);
        };
        console.log(dependencies);
        //save the data on locals and go to next middleware function
        res.locals.clusterData = dependencies;
        return next();                   
      } catch (err){
        return next(err || 'There was an error sraping dependencies');
      }   
  })
}    

module.exports = dependencyScraperController;

/* 
    OUR DATA SHOULD LOOK LIKE THIS SO THAT WE CAN PASS IT TO THE NEXT MIDDLEWARE
    [
        {
            name: 'client-deployment-6f9b4fb994-k9rxr',
            kind: 'Pod',
            apiVersion: 'v1',
            namespace: 'default',
            image: 'stephengrider/multi-client'
        },
        {
            name: 'client-deployment-6f9b4fb994-rql5d',
            kind: 'Pod',
            apiVersion: 'v1',
            namespace: 'default',
            image: 'stephengrider/multi-client'
        },
        {
            name: 'client-deployment-6f9b4fb994-zsgzd',
            kind: 'Pod',
            apiVersion: 'v1',
            namespace: 'default',
            image: 'stephengrider/multi-client'
        },
        ... more dependencies
    ]
*/


               //use a regular expression
            //     //look for all text after apiVersion: on the same line, get rid of whitespace
            //     const apiVersion = new RegExp('apiVersion:.*');
            //     let apiVersionArray = apiVersion.exec(content);
            //     obj.apiVersion = apiVersionArray[0];
            //     //look for kind
            //     const apiKind = new RegExp('kind:.*');
            //     let apiKindArray = apiKind.exec(content);
            //     obj.apiKind = apiKindArray[0];
            //     //look for name
            //     const apiName = new RegExp('name:.*');
            //     let apiNameArray = apiName.exec(content);
            //     obj.apiName = apiNameArray[0];
            //     //look for namespace
            //     try{
            //         const apiNamespace = new RegExp('namespace:.*');
            //         let apiNamespaceArray = apiNamespace.exec(content);
            //         obj.apiNamespace = apiNamespaceArray[0];
            //     }
            //     catch {
            //         obj.apiNamespace = 'Default';
            //     }
            //     //look for image
            //     try{
            //         const apiImage = new RegExp('image:.*');
            //         let apiImageArray = apiImage.exec(content);
            //         obj.apiImage = apiImageArray[0];
            //     }
            //     catch {
            //         obj.apiImage = 'Test';
            //     }
            //    dependencies.push(obj);
            // }
            //store the data on res.locals, we can rename this when we connect it to the rest
            // res.locals.clusterData = dependencies;
            // return next();   