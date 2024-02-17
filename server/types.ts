import { Request, Response, NextFunction } from 'express';

export type Error = {
    log: string,
    status: number,
    message: string
}

//define all of our types here
//define our get dependencies functions types
export type GetDependencies = (req: Request, res: Response, next: NextFunction) => void

//define all of our larger controller's types
export type DependencyScraperController = {
    getDependencies: GetDependencies;
}
// define types for our api objects that go within our api array  
export type ApiObj = Record<string, string>;
// type for globbing options
export type Options = {
    cwd: string,
    absolute: boolean,
    ignore: string
};
//define getApiInfo type
export type GetApiInfo = ( req: Request, res: Response, next: NextFunction ) => void;

//define controller type
export type KubePugController = {
  getApiInfo: GetApiInfo;
}
export type Kind = {
  version: string;
  replacement: {
    group: string;
    version: string;
    kind: string;
  } | Record<string, never> //union type
  description: string;
}

export type ApiObject = Record<string, any>; //the object keys are in type of string, while the value can be of any type

export type ApiInfo = {
    [key: string]: Kind //index signatures
  };

export type GetUserInput = (req: Request, res: Response, next: NextFunction) => void

export type HelmController = {
    getUserInput: GetUserInput;
}
export type NewObj = {
    name?: string,
    kind?: string,
    apiVersion?: string,
    namespace?: string,
    image?: string
}
export type MatchedData = string[];
export type CleanData = NewObj[];