# CSWAP Toolkit

This repository is a monorepo manage with [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) and [Lerna](https://lerna.js.org/). 

Forked from https://github.com/pancakeswap/pancake-toolkit

Imported https://github.com/pancakeswap/pancake-frontend

Imported https://github.com/pancakeswap/pancake-swap-sdk

Imported https://github.com/pancakeswap/pancake-info-api

## Packages

- `cswap-uikit` : React components used to build the CSWAP UI
- `cswap-eslint-config` : An ESLint config for CSWAP, with Typescript and Prettier support
- `cswap-frontend` : Main CSWAP web app
- `cswap-info-api` : express nodejs API implementation for CSWAP on-chain data query
- `cswap-prelaunch` : prelaunch landing page with count down clock
- `cswap-profile-sdk` : Handy functions to retrieve data for CSWAP Profile system
- `cswap-swap-sdk`: Handy functions to retrieve data for CSWAP contracts
- `token-lists` : Main CSWAP token list and tools to validate it

## How to use

### Install `lerna`

```
npm install --global lerna
```

### Install dependencies

```
lerna bootstrap
```

### Build 

```
lerna run build
```

### Start `cswap-frontend`

```
cd ./packages/cswap-frontend
npm start
```

## Troubleshooting

### Add child package to existing monorepo with git history

```
lerna import ~/pancake-frontend --flatten
lerna import ~/pancake-swap-sdk --flatten
lerna import ~/pancake-info-api --flatten
```

`--flatten` is important and commit history may lost without it
change `name` in `<child>/package.json` after imported

### Add sibling dependencies

```
lerna add cswap-uikit --scope=cswap-frontend
lerna add cswap-sdk --scope=cswap-frontend
```

### Remove child dependencies (when changing branches with different dependencies)

```
lerna clean  -y
```

### Remove root dependencies

```
rm -rf node_modules
```

### Remove locked dependencies

```
rm yarn.lock
```

### Resolve incorrect version of dependencies

Change package version in `<root>/package.json`

## References

https://medium.com/mitterio/multirepo-to-lerna-js-monorepo-80f6657cb443

https://stackoverflow.com/questions/60906133/cannot-add-dependency-to-sibling-monorepo-package-using-lerna

https://github.com/lerna/lerna/issues/2352
