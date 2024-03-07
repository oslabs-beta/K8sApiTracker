<p align="center"><img src="./logo.png" width="300" /></p>

# Kubernetes API Tracker (KAT)
For Kubernetes engineers, encountering deprecated APIs is a common challenge. Sifting through Kubernetes documentation to verify every API used in your cluster can take a substantial amount of time. KAT is designed to address this issue by enabling users to swiftly identify deprecated APIs and discover appropriate alternatives.

KAT will scan your kubernetes configuration files, cross check them against a list of deprecated API's, and provide a summary of your cluster in a lightweight GUI. In addition, KAT will identify the location of each API, and provide commentary as well as a recommended replacement. KAT is designed to be run locally for maximum security, and does not require signup of any form of data collection.

# Installation and Getting Started

Requirements: Node Package Manager

1) Clone the project into the root repository where your Kubernetes configuration files exist, or are nested within. KAT is designed to scan the directory in which it is installed, and all nested sub-directories, so please ensure that the location of installation is correct.
2) Ensure you are in the K8sDependencyTracker Repository and run npm install to install dependencies.
3) Run TSC to compile all typescript files.
4) Run npm run dev.
    OR
4) Run npm run build to prepare the bundle.
5) Run npm start, and go to localhost:3000 to see all of your dependencies.

Once the project is installed, you should be up and running! Click the buttons to scan a local cluster or Helm Chart. Filter dependencies, and search through the automatically generated list.

# Contributing

To contribute please fork the repository and submit a pull request with a descriptive explanation of the changes made. Feel free to reach out to us with any questions on the product using the information listed in the Contributors & Contact section. 

Key features on our roadmap include:
- Compataility with cloud hosted clusters

# License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details

# Contributors & Contact

Matt Hart - [Github](https://github.com/TechToysAreFun) | [Linkedin](https://www.linkedin.com/in/mehart/)

Thomas Ortiz - [Github](https://github.com/thomas444ortiz) | [Linkedin](https://www.linkedin.com/in/thomas-ortiz-52a187166/)

Tyler Savitsky - [Github](https://github.com/booleanmagus) | [Linkedin](https://www.linkedin.com/in/tylersavitsky/)

Yiting Xiao - [Github](https://github.com/Yitingx531) | [Linkedin](https://www.linkedin.com/in/yiting-xiao/)

# Aknowledgements

Thank you to the team at Kubepug for putting together the script to scrape the [Kubernetes Repository](https://github.com/kubernetes/api/blob/master/README.md) for the latest deprecated API status. Thank you to the team at Kubernetes for providing the [original script](https://github.com/kubernetes/code-generator/tree/master/cmd/prerelease-lifecycle-gen), and for the excellent documentation.