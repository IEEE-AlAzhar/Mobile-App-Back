# IEEE Mobile App Back-End

The source code of `IEEE Al-Azhar` student activity's mobile app back-end. The app built to provide some of organization's services inside the team with simplicity in mind. Also it provides an opportunity for students to collaborate and contribute to enhance their programming and train to contribute to open source community.

## Table of contents

1. [Installation](#install)
1. [Usage](#use)
1. [Structure](#structure)
1. [License](#license)

## Installation

Make sure to have [Node.js](https://nodejs.org/en/download/) installed on your machine.

1. Clone this repo `$ git clone https://github.com/IEEE-AlAzhar/Mobile-App-Back.git` or using `ssh`.

2. `$ cd Mobile-App-Back`.

3. Run `$ npm install` to install dependencies and packages in the root then install packages in `front/` by running `$ npm run front-install`.

## Usage

> Install `nodemon` globally to be able to run the back-end: `$ npm i -g nodemon`

1. Create a `.env` file at the root of the project

   1. Copy the content of `.env-example` in to the `.env` file you did created.
   1. Register for a DB URI in [mongo atlas](https://account.mongodb.com/) or any other service and add the `URI string` as the value of `DB_URI` variable. Use [this guide](https://docs.atlas.mongodb.com/getting-started/) to know how to register in mongo atlas.

1. Run `$ npm run dev-start` to start serving the app (front & back), then go to `https://localhost:3000` to view the front and start using the back it is started already.

## Structure

The folder structure of the application.

> The front app is modular, every module encapsulates its own components and services. Each module contains `components` folder which has the presentational components and also pages, also the module contains the `services` folder if it's dynamic which has all the services that integrate with the `API`.

```

```

## Contribution

Follow the guides mentioned in the [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
