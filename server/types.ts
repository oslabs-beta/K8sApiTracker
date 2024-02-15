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