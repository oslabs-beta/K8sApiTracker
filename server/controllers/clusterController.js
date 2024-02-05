"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const clusterController = {
    kubectlGetAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const childProcess = require('child_process');
        const clusterData = [];
        function sh(cmd_to_execute) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise(function (resolve, reject) {
                    childProcess.exec(cmd_to_execute, (err, stdout, stderr) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            const data = JSON.parse(stdout);
                            const objects = data.items;
                            objects.forEach((object) => {
                                const newObj = {
                                    name: object.metadata.name,
                                    kind: object.kind,
                                    apiVersion: object.apiVersion,
                                    namespace: object.metadata.namespace,
                                    image: 'placeholder'
                                };
                                if (newObj.kind === 'Pod') {
                                    newObj.image = object.spec.containers[0].image;
                                }
                                else
                                    newObj.image = '-';
                                clusterData.push(newObj);
                            });
                            resolve(clusterData);
                        }
                    });
                });
            });
        }
        // The following command is run from the directory that this file is in
        res.locals.clusterData = yield sh('kubectl get all -o json');
        return next();
    })
};
module.exports = clusterController;
