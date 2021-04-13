# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to start
1) Set up the ASIEC_REMOTE_PROXY global variable which says where we should send requests
2) Check that `.yarnrc.yml` file in folder is not existing. If you find it, delete it before the next step
3) Install yarn 2 (https://yarnpkg.com/getting-started/migration#step-by-step)
4) Go to `.yarnrc.yml` file and add new line `nodeLinker: "node-modules"`
How it should looks like:
```
yarnPath: ".yarn/releases/yarn-berry.cjs"
nodeLinker: "node-modules"
```
5) Install dependencies

```sh
yarn install
```

6) Start the app

```sh
yarn start
```
