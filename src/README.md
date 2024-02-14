# Overview

We built the frontend using Typescript, which is compiled to Javascript by Webpack. The function of each component should be relativley self explanatory, but important points are highlighted below.

## [Index.tsx](./index.tsx)

This file is the root of our react app, and serves as the entrypoint for our webpack bundle. This file will take our react App, and render it into the div with the id of 'root'.

## [MainPageContainer.tsx](./MainPageContainer.tsx)

This is the component where the bulk of the logic for our fontend is held. First, we initialize state for the dependencies, the filters, and whether or not the dependency info is loading.
Then we make our fetch request to the backend to get the information, and populate the page with a 'Row' component for each dependency. Finally, we declare a function definition used to allow users to filter dependencies and passed down to the FilterDropdown component. All state is passed down through props using vanilla react.