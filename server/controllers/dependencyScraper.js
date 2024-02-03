const {
    glob,
    globSync,
    globStream,
    globStreamSync,
    Glob,
  } = require('glob');
const fs = require('fs');
const yaml = require('js-yaml');

const dependencyScraperController = {};

dependencyScraperController.getDependencies = (req, res, next) => {
    try{
        console.log("Get dependencies Controller invoked")
        //perform globbing logic here to take our data from our files and put it in a data form
        //get our list of files
        const getYaml = async () => {
            const response = await glob('**/*.yaml', { ignore: 'node_modules/**' });
            // console.log(response);
            return response;
        };
        getYaml()
        .then((data) => {
            // after getting the array of yaml files, we need to make them compatible with regular expressions
            // to do this, for each file in the array, we must use the fs method readFile (readFIleSync) and the js-yaml load method
            // store the output of these two methods in a variable
            // then use a regular expression on that variable's conten ts to grab the data we need in the shape defined below
            
            // for each file, get the data we want
            for(const file of data){
                const obj = {};
                // use fs method,
                const content = fs.readFileSync(file, 'utf-8');
                //use a regular expression
                //look for all text after apiVersion: on the same line, get rid of whitespace
                const apiVersion = new RegExp('apiVersion:.*');
                let apiVersionArray = apiVersion.exec(content);
                obj.apiVersion = apiVersionArray[0];
                //look for kind
                const apiKind = new RegExp('kind:.*');
                let apiKindArray = apiKind.exec(content);
                obj.apiKind = apiKindArray[0];
                //look for name
                const apiName = new RegExp('name:.*');
                let apiNameArray = apiName.exec(content);
                obj.apiName = apiNameArray[0];
                //look for namespace

                //look for image
                try{
                const apiImage = new RegExp('image:.*');
                let apiImageArray = apiImage.exec(content);
                obj.apiImage = apiImageArray[0];
                }
                catch {
                obj.apiImage = 'Test';
                }


                console.log(obj);
            }


            //store the data on res.locals, we can rename this when we connect it to the rest
            res.locals.test = {data: 'This will be the data holding our dependencies'};
            return next();        
        });

    }
    catch {
        return next('There was an error scraping your dependencies');
    }
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