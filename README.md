# Controk Web Socket

[![travis-badge]][travis]
[![codecov-badge]][codecov]
[![codeclimate-badge]][codeclimate]
[![license-badge]][license]

[![dependencies-badge]][dependencies]
[![dev-dependencies-badge]][dev-dependencies]
[![docker]]()

#### [Idiomatic.js][idiomatic-js]

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

**Note**: This is the WebSocket part of the Controk system and may have some features faked for demonstrative purposes. [Click here](https://github.com/jourdanrodrigues/controk-docker) for the fully working system.

### Prerequisites

These instructions will build the environment to run commands on the project.

* [NodeJS][node-link]
* [NPM](https://www.npmjs.com/)
* [PostgreSQL](https://www.postgresql.org/)

### Installing

#### Manual

- Create `.env` file, based on `.env.example`, and set your environment as you wish;
- `npm install`;
- `npm start`.

#### Based on "docker"

- The next command will give you a running server. Needing anything specific, change in `docker-compose.yml`;
- `docker-compose build`;
- `docker-compose up`.

The server must be running at [http://localhost:8888/].

## Running the tests

### Manual

- Create a ".env" file base on ".env.example" in the project's root;
- `npm test`.

### Based on "docker"

- Open the `docker-compose.yml` file with your favorite text editor and change the `socket` service command to `npm test`;
- `docker-compose up`.

## Deployment

Clone the project:

`git clone https://github.com/jourdanrodrigues/controk-socket`

Build the project with docker compose:

`docker-compose build`

Raise the project:

`docker-compose up`

## Built With

* [NodeJS][node-link]
* [ExpressJS](http://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/jourdanrodrigues/controk-socket/tags). 

## Authors

* **Jourdan Rodrigues** - *Initial work* - [Jourdan Rodrigues](https://github.com/jourdanrodrigues/)

See also the list of [contributors][contributors] who participated in this project.

[idiomatic-js]: https://github.com/rwaldron/idiomatic.js
[travis-badge]: https://travis-ci.org/jourdanrodrigues/controk-socket.svg?branch=master
[travis]: https://travis-ci.org/jourdanrodrigues/controk-socket?branch=master
[codecov-badge]: https://codecov.io/gh/jourdanrodrigues/controk-socket/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/jourdanrodrigues/controk-socket
[license-badge]: https://img.shields.io/github/license/jourdanrodrigues/controk-socket.svg
[license]: https://github.com/jourdanrodrigues/controk-socket/blob/master/LICENSE
[docker]: https://img.shields.io/docker/automated/jourdanrodrigues/controk-socket.svg
[dependencies-badge]: https://david-dm.org/jourdanrodrigues/controk-socket.svg
[dependencies]: https://david-dm.org/jourdanrodrigues/controk-socket
[dev-dependencies-badge]: https://david-dm.org/jourdanrodrigues/controk-socket/dev-status.svg
[dev-dependencies]: https://david-dm.org/jourdanrodrigues/controk-socket?type=dev
[codeclimate-badge]: https://codeclimate.com/github/jourdanrodrigues/controk-socket/badges/gpa.svg
[codeclimate]: https://codeclimate.com/github/jourdanrodrigues/controk-socket
[node-link]: https://nodejs.org/en/
