# Overview
All requests are routed by routes defined in the server.ts file, which invoke middleware functions containing our business logic. For those looking to contribute, the recommended approach is to include new middleware functions to performa additinoal logic, without changing the existing routes, middleware, and data structures, and any more than is strictly necessary. Refactoring is also encouraged, but please ensure that 

# Server.ts
In addition to starting an express server on localhost:3000, this file contains the following routes:

- get '/dependencies' route: invokes the dependencyScraper, kubePugControlller, and compareController, which collectively retrieve user data, retrieves the latest Kubernetes api information, and combines them into a single object to be sent back in the response.

# dependencyScraper.ts


# kubePugController.ts


# compareController.ts


# clusterController.ts

This controller is not currently being invoked anywhere in the project, but was included in case users wanted to implement the functionality to scan their dependencies in-cluster using Kubectl.

