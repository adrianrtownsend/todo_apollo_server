# Advanced Todo | Backend Apollo GraphQL Server

## About the project

This repository contains the code for a backend GraphQL server built with Apollo Server, using MySQL as the database, Docker Compose for deployment, Husky and linting for code quality, and Firebase authentication for user management. This backend repository is part of a boilerplate modern web application.

## Clone the Repository

```sh
git clone https://github.com/adrianrtownsend/advanced-todo-apollo-server.git
cd advanced-todo-apollo-server
```

## Table of Contents

- [Advanced Todo | Backend Apollo GraphQL Server](#advanced-todo--backend-apollo-graphql-server)
  - [About the project](#about-the-project)
  - [Clone the Repository](#clone-the-repository)
  - [Table of Contents](#table-of-contents)
  - [Requirements and Prerequisites](#requirements-and-prerequisites)
    - [Additional packages to install](#additional-packages-to-install)
    - [Integration Setup](#integration-setup)
  - [Installation](#installation)
  - [Configuration](#configuration)
    - [TypeORM Migrations](#typeorm-migrations)
  - [Database Setup](#database-setup)
  - [Start the Server](#start-the-server)
  - [Linting and Code Quality](#linting-and-code-quality)
  - [Docker Compose deployment](#docker-compose-deployment)
  - [CI/CD Deployment](#cicd-deployment)

## Requirements and Prerequisites

### Additional packages to install

- [Node](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/)
- [MySQL](https://www.npmjs.com/package/mysql2)
- [Docker](https://docs.docker.com/get-docker/)

### Integration Setup

- [Firebase Project](https://firebase.google.com/docs/auth/web/start)
- [Netlify Account](https://docs.netlify.com/) | optional: required for remote deployment

## Installation

```
npm install
```

## Configuration

- Configure sql vars
  - This project is configured to run with a dockerized mysql database. Whichever authentication credentials are set must be copied to the env file
  ```
  MYSQL_DATABASE=
  MYSQL_HOST=
  MYSQL_DOCKER_HOST=
  MYSQL_PORT=
  MYSQL_USER=
  MYSQL_PASSWORD=
  MYSQL_ROOT_PASSWORD=
  ```
- Create firebase project
  - Configure a Firebase project and [Add the Firebase Admin SDK](https://firebase.google.com/docs/admin/setup?hl=en&authuser=0&_gl=1*1r4qkl4*_ga*NTUyNjY4MjA4LjE2OTQ3NTI5NjA.*_ga_CW55HF8NVT*MTY5ODMwMDE1OC4yNC4xLjE2OTgzMDI1OTUuMzAuMC4w). This will give you the correct `firebase-admin.config.json` to use.

### TypeORM Migrations

- Synchronize config option
  Once you get into production you'll need to synchronize model changes into the database. Typically, it is unsafe to use synchronize: true for schema synchronization on production once you get data in your database. Here is where migrations come to help.

- Running migration options

```

# Create
npx typeorm-ts-node-commonjs migration:create <path-to-migrations>/<migration-name>

# Generate
npx typeorm-ts-node-commonjs migration:generate <path-to-migrations>/<migration-name> -d <path-to-data-source>/<data-source.ts>

# Run
npx typeorm-ts-node-commonjs migration:run -d path-to-datasource-config
```

## Database Setup

- The preferred method for running the application is within docker containers using the provided docker config files. The command for running only the database:

```
  docker compose up db
```

## Start the Server

```
npm run start

# optional start methods
npm run start:compile # run codegen and typescript precomipilers
npm run watch # restart app with nodemon in watch mode
```

## Linting and Code Quality

- [CommitLint Setup](https://commitlint.js.org/#/guides-local-setup)
- [Husky](https://typicode.github.io/husky/)

## Docker Compose deployment

[] docker deplyoment and troubleshooting

```
  docker compose up --build
  # or
  docker compose watch
```

## CI/CD Deployment

[] Finish ci/cd deployment instructions

This application is hosted on [Netlify](https://www.netlify.com/) along with the [React Native Client](https://github.com/adrianrtownsend/todo_expo_client).

- Create netlify account
- Once done, retrieve the config values from your Netlify account to add to your environment variables.
- Add the following environment variables with config values to your list of project secrets
  ```
  NETLIFY_ONE=
  NETLIFY_TWO=
  NETLIFY_THREE=
  ```
