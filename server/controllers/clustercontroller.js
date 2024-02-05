const clusterController = {};

clusterController.kubectlGetAll = async (req, res, next) => {

    const childProcess = require('child_process');
    const { default: cluster } = require('cluster');

    const clusterData = [];

    async function sh(cmd_to_execute) {
        return new Promise(function (resolve, reject) {
            childProcess.exec(cmd_to_execute, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    const data = JSON.parse(stdout);
                    const objects = data.items;
                    objects.forEach((object) => {
                        const newObj = {
                            name: object.metadata.name,
                            kind: object.kind,
                            apiVersion: object.apiVersion,
                            namespace: object.metadata.namespace
                        }

                        if (newObj.kind === 'Pod') {
                            newObj.image = object.spec.containers[0].image;
                        }
                        else newObj.image = '-';

                        clusterData.push(newObj);
                    })
                    resolve(clusterData);
                    // resolve({ stdout, stderr });
                }
            });
        });
    }

    // The following command is run from the directory that this file is in
    res.locals.clusterData = await sh('kubectl get all -o json');
    return next();
}

module.exports = clusterController;