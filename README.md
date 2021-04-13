# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to start
1) Set up the ASIEC_REMOTE_PROXY global variable which says where we should send requests
2) Install yarn 2 (https://yarnpkg.com/getting-started/migration#step-by-step)
3) Go to `.yarnrc.yml` file and add new line `nodeLinker: "node-modules"`
How it should looks like:
```
yarnPath: ".yarn/releases/yarn-berry.cjs"
nodeLinker: "node-modules"
```
4) Install dependencies

```sh
yarn install
```

5) Start the app

```sh
yarn start
```
