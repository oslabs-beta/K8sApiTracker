import { HelmController, NewObj, CleanData, Error, MatchedData } from '../types'

const helmController: HelmController = {

    getUserInput: async (req, res, next) => {

        const childProcess = require('child_process');

        /* 'installChart' and repoProcess functions run child processes to execute a command in the user's terminal; the command being a helm install w/ dry-run and debug flags for whatever helm chart the user inputs in the front end, along with the respective chart's command to link the repo to the user's computer. The returned object from installChart has a 'manifest' property that represents the .yaml files of that helm chart. We then use a regex expression to parse that data and store into an array. */

        async function installChart(cmd_to_execute: string) {
            console.log('Inside installChart child process');
            return new Promise(function (resolve, reject) {
                childProcess.exec(cmd_to_execute, { maxBuffer: 1024 * 5000 }, (err: any, stdout: any, stderr: any) => {
                    if (err) {
                        console.log('Error occured in installChart child process');
                        console.log(err);
                        return next(err);
                    } else {
                        const data = JSON.parse(stdout);

                        const manifest = data.manifest;

                        const regExp = new RegExp('(?=Source: )(.*?)(.yaml)|(?=apiVersion: )(.*?)(?=\\nkind)|(?=kind: )(.*?)(?=\\n)', "gm");

                        const regExpData = manifest.match(regExp);

                        resolve(regExpData);
                    }
                });
            });
        }

        async function repoProcess(cmd_to_execute: string) {
            return new Promise(function (resolve, reject) {
                childProcess.exec(cmd_to_execute, (err: Error, stdout: any, stderr: any) => {
                    if (err) {
                        console.log('Error occured repoProcess sh function');
                        reject(err);
                    } else {
                        resolve(stdout);
                    }
                });
            });
        }

        /* Get helm chart install command from user input. Then reformat the string to include the dry-run and debug flags with a json output at the end. Check to see if the repo input was populated, if so, run that in it's own child process first. If it's not run and the repo hasn't been linked on the user's machine, the front end will alert the user to submit it. Finally, call the 'repoProces' function above with the cleaned user input to execute the dry-run chart install, the output of which will be iterated through and filed into an array of objects representing each .yaml file in the chart. */

        let userInput = req.body.helmChartPath;
        userInput = userInput.slice(13);
        userInput = `helm install --dry-run --debug ${userInput} -o json`;

        if (req.body.helmRepoPath.length) {
            const addRepo = `${req.body.helmRepoPath}`;
            await repoProcess(addRepo);
        }

        const matchedData: MatchedData = await installChart(userInput) as MatchedData;
        /* Now that we have the raw properties back from the chart install, iterate through that array, creating a new object whenever we hit an element that starts with "Source: ". Populate that object with the next two elements which should be the apiVersion and kind. Then hard code the namespace and image properties which will be default for the dry-run chart installs. This object is in the same format as the object that we persist through our middleware when scanning a users cluster, allowing us to render consistent data on the front end regardless of 'scan' type. */

        const cleanMatchedData: CleanData = [];

        for (let i = 0; i < matchedData.length; i++) {
            // Iterate through matchedData looking for elements that begin with "Source: " 
            if (matchedData[i].slice(0, 6) === 'Source') {
                // When found, init a new object to begin storing the next several elements into
                const newObj: NewObj = {}
                // Store that first "Source: " element in the object, slicing off the "Source: " so it's just the name of the .yaml file
                newObj.name = matchedData[i].slice(8)
                // Check for apiVersion
                if (i + 1 < matchedData.length) {
                    if (matchedData[i + 1].slice(0, 3) === 'api') {
                        newObj.apiVersion = matchedData[i + 1].slice(12);
                        i++;
                    }
                }
                // Check for kind
                if (i + 1 < matchedData.length) {
                    if (matchedData[i + 1].slice(0, 4) === 'kind') {
                        newObj.kind = matchedData[i + 1].slice(6);
                        i++;
                    }
                }
                // Init namespace to 'default' and image to 'placeholder'
                newObj.namespace = 'default';
                newObj.image = 'placeholder';
                cleanMatchedData.push(newObj);
            }
        }
        console.log(cleanMatchedData);
        res.locals.helmData = cleanMatchedData;
        return next();
    }
}

export default helmController;