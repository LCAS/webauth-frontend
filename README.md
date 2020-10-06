# Webauth-frontend

This project contains the frontend for webauth project, see more @
<https://github.com/1nfiniteloop/webauth>. The frontend is based on
Angular framework.

## Design notes

* The api endpoints is dynamically fetched from the back-end at first launch
  and stored as a cookie. If endpoints has changed, clear the cookies or
  visit `/api/endpoints` to reconfigure.
* User sessions is recognized from the presence of a cookie, which is set from
  the backend after a successful login.
* All use-cases for a regular user is implemented, however the admin api
  endpoints is currently not implemented.

## Development environment

### Environment setup

Visual Studio Code is used as development environment, running a dev-container,
see more @ <https://code.visualstudio.com/docs/remote/containers>

### Preparation

* Add a docker network for backend requests with:
  `docker network create webauth`.
* Open VS Code in dev-container.
* VS Code terminal must be run in interactive mode to expose angular cli-tools:
  `/bin/bash -l`.

### Develop

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app
will automatically reload if you change any of the source files. Modify
`proxy.conf.json` accordingly to proxy back-end requests to the webauth server,
Read more @ <https://angular.io/guide/build#proxying-to-a-backend-server>.

### Build & deploy

1. Build the dist-version with `ng build --prod --deploy-url /static/`.
   flag `--deploy-url` decides where the front-end requests the .js and
   .css-files from.
2. Fetch the compiled files from `dist/webauth-frontend`.

## Reference

* Angular docs - <https://angular.io/docs>
* Angular material - <https://material.angular.io/>
* Material icons - <https://material.io/resources/icons/?style=baseline>
