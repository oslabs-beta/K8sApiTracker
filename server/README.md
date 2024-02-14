# Overview
All requests are routed by routes defined in the server.ts file, which invoke middleware functions containing our business logic. For those looking to contribute, the recommended approach is to include new middleware functions to performa additinoal logic, without changing the existing routes, middleware, and data structures, and any more than is strictly necessary. Refactoring is also encouraged, but please ensure that 

## [Server.ts](./server.ts)
In addition to starting an express server on localhost:3000, this file contains the following routes:

- get '/dependencies' route: invokes the dependencyScraper, kubePugControlller, and compareController, which collectively retrieve user data, retrieves the latest Kubernetes api information, and combines them into a single object to be sent back in the response.

## [dependencyScraper.ts](./controllers/dependencyScraper.ts)

This controller works by escaping into the parent directory of wherever the repo was cloned, and then using glob to crawl that directory, and all sub directories, for any file that ends in the extension .yaml, returning an array containing the filepath of each of file found.

Once it has found all of the config files, the function will scrape the content from each file, and store it in an object. The final result will be an array of all of the users api's stored on res.locals.clusterData to be used by the next middleware functions.

It is important to note that this function will scrape all child directories of the directory where it is installed, and look for all Yaml files (even if they are not related to Kubernetes); if there are a significant amount of subdirectories, this function can take several seconds or minutes to run. For this reason, it is important that users clone the KAT tool into the right directory, where it will not scrape files that are not relevent to the cluster.

## [kubePugController.ts](./controllers/kubePugController.ts)

This controller sends a fetch request to the endpoint where the Kubernetes api info is stored, and returns an object containing the available information. Then, we manually store the important information on an object, with a nested object for each api, and store it on res.locals.apiInfo for the next middleware function to use.

## [compareController.ts](./controllers/compareController.js)

This controller takes the data stored by the two previous middleware functions (dependencyScraper and kubePugController) and updates res.locals.clusterData to contain the information on the deprecation status of each api in the users cluster, so that it can be returned by the request.

## [clusterController.ts](./controllers/clusterController.ts)

This controller is not currently being invoked anywhere in the project, but was included in case users wanted to implement the functionality to scan their dependencies in-cluster using Kubectl.

This controller works by starting up a terminal, sending executing the command 'kubectl get all -o json', turning the result into an array of objects (one for each api), and storing the result on res.locals.clusterData for use by the next middleware function. The Kubectl command, and therefore the middleware, will only work if the user has an active Kubernetes cluster running on their machine.
