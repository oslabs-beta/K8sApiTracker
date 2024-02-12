import { Request, Response, NextFunction } from 'express';

type getUserInput = (req: Request, res: Response, next: NextFunction) => void

type HelmController = {
    getUserInput: getUserInput;
}

const helmController: HelmController = {
    getUserInput: async (req, res, next) => {
        const childProcess = require('child_process');

        let dryRunData = {};

        async function sh(cmd_to_execute: string) {
            console.log('Inside of sh function');
            return new Promise(function (resolve, reject) {
                childProcess.exec(cmd_to_execute, (err: any, stdout: any, stderr: any) => {
                    if (err) {
                        console.log('Error occured in sh function');
                        reject(err);
                    } else {
                        console.log('No errors in sh function - processing data now');
                        const data = JSON.parse(stdout);
                        resolve(data.manifest);
                    }
                });
            });
        }
        //! HARD CODED VERSION - UPDATE BEFORE PRODUCTION
        res.locals.helmData = await sh('helm install --dry-run --debug my-prometheus prometheus-community/prometheus --version 25.11.1 -o json');
        return next();
    }
}

module.exports = helmController;