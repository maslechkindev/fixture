## Install yarn

```bash
$ npm i -g yarn
```

## Setup .env file
In the root of the project copy .env.example into a file named .env. Speak to another team member to get required values.

## Install dependencies all

```bash
$ yarn
```

## Local running the app

```bash
# watch mode
$ yarn start:local
```

## Prod running the app
```bash
# prebuild
$ yarn prebuild

# build
$ yarn build

# start
$ yarn start
```

## Test

```bash
# unit tests
$ yarn test

# unit tests in band
$ yarn test:band

# test coverage
$ yarn test:cov
```

## Migrations

```bash
# runs all migrations that have not yet been run.
$ yarn migrate:latest

# docs: https://knexjs.org/#Migrations-API
```
