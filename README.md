![Version](https://maven-badges.herokuapp.com/maven-central/org.infinispan/infinispan-console/badge.svg "Version")

# Infinispan Console 

This is the front end application for the web console of the new Infinispan Server 12.x

This application is built using [Patternfly 4 and React](https://www.patternfly.org/v4/get-started/developers)

## Before you start
This project needs a standalone infinispan server running locally.
The Infinispan server exposes the [REST API](https://infinispan.org/docs/dev/titles/rest/rest.html) 
that is used in this console.

In production, this console is built as a dependency using maven. This dependency is added to the infinispan
server bundle, so the console is served from the server in production.

### Use Docker

To run the latest development release version, run 12.0

```bash
 docker run -it --rm -p 11222:11222 -e USER="user" -e PASS="pass" infinispan/server:12.0
```

### Direct download
You can always download the server from the [Infinispan website](https://infinispan.org/download/)

## Quick-start
```bash
git clone https://github.com/infinispan/infinispan-console # clone the project
cd infinispan-console # navigate into the project directory
npm install # install infinispan-consoledependencies
npm run start:dev # start the development server
```
## Development Scripts

Install development/build dependencies
`npm install`

By default, Console in development mode looking for the Infinispan Server REST URL at the `http:\\localhost:11222\v2\rest`

It's possible to replace host and port URL connection with `INFINISPAN_SERVER_URL` environment variable which will be added to the REST endpoint

Start the development server
`npm run start:dev`

Run a production build (outputs to "dist" dir)
`npm run build`

Run the test suite
`npm run test`

Run the linter
`npm run lint`

Run the code formatter
`npm run format`

Launch a tool to inspect the bundle size
`npm run bundle-profile:analyze`

## Build de maven dependency

This console is built and released as a maven dependency used in the infinispan server.

`mvn clean install` 

#### Skip Unit tests
Unit test run by default. To skip them use 'skipTests' property.

`mvn clean install -DskipTests` 

#### Run Cypress IT Tests
Integration tests don't run by default locally. They always run in CI.
To run integration tests locally:
You need to run first `./run-server-for-e2e.sh` that will download and run the infinispan server.
Then `mvn clean install -De2e=true` 

## Configurations
* [TypeScript Config](./tsconfig.json)
* [Webpack Config](./webpack.common.js)
* [Jest Config](./jest.config.js)
* [Editor Config](./.editorconfig)

## Favicons

Generated with [Favicon generator](https://www.favicon-generator.org/)


## Code Quality Tools
* For accessibility compliance, we use [react-axe](https://github.com/dequelabs/react-axe)
* To keep our bundle size in check, we use [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
* To keep our code formatting in check, we use [prettier](https://github.com/prettier/prettier)
* To keep our code logic and test coverage in check, we use [jest](https://github.com/facebook/jest)
