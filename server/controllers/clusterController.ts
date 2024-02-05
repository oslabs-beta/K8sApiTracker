import { Request, Response, NextFunction, RequestHandler } from 'express';

//define all of our types here
//define our get dependencies functions types
type KubectlGetAll = (req: Request, res: Response, next: NextFunction) => Promise<any>

//define all of our larger controller's types
type ClusterController = {
    kubectlGetAll: KubectlGetAll;
}

//define other types
type NewObj  = {
    name: string,
    kind: string,
    apiVersion: string,
    namespace: string,
    image: string
}
type ClusterData = NewObj[];

const clusterController: ClusterController = {
    kubectlGetAll: async (req: Request, res: Response, next: NextFunction) => {

        const childProcess = require('child_process');
        const { default: cluster } = require('cluster');
    
        const clusterData: ClusterData = [];
    
        async function sh(cmd_to_execute: any) {
            return new Promise(function (resolve, reject) {
                childProcess.exec(cmd_to_execute, (err: any, stdout: any, stderr: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        const data = JSON.parse(stdout);
                        const objects = data.items;
                        objects.forEach((object: any) => {
                            const newObj: NewObj = {
                                name: object.metadata.name,
                                kind: object.kind,
                                apiVersion: object.apiVersion,
                                namespace: object.metadata.namespace,
                                image: 'placeholder'
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

};

module.exports = clusterController;