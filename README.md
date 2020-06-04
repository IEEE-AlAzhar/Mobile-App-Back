# IEEE Mobile App Dashboard

The source code of `IEEE Al-Azhar` student activity's mobile app Dashboard. The app built to provide some of organization's services inside the team with simplicity in mind. Also it provides an opportunity for students to collaborate and contribute to enhance their programming and train to contribute to open source community. Our app is a `MERN` app that's built with `React` and `Typescript` in the front and `Node.js`, `Express` and `mongoDB` in the back.

## Table of contents

1. [Installation](#install)
1. [Usage](#use)
1. [Structure](#structure)
1. [License](#license)

## Installation

Make sure to have [Node.js](https://nodejs.org/en/download/) installed on your machine.

1. Clone this repo `$ git clone https://github.com/IEEE-AlAzhar/Mobile-App-Back.git` or using `ssh`.

2. `$ cd Mobile-App-Back`.

3. Run `$ npm install` to install dependencies and packages in the root then install packages in `dashboard/` by running `$ npm run front-install`.

## Usage

> Install `nodemon` globally to be able to run the back-end: `$ npm i -g nodemon`

1. Create a `.env` file at the root of the project

   1. Copy the content of `.env-example` in to the `.env` file you did created.
   1. Register for a DB URI in [mongo atlas](https://account.mongodb.com/) or any other service and add the `URI string` as the value of `DB_URI` variable. Use [this guide](https://docs.atlas.mongodb.com/getting-started/) to know how to register in mongo atlas.
   1. Add a custom `JWT_PASSWORD` code by yourself.
   1. Register for `cloudinary` service and get the cloud name, api key and api secret then put the values in the variables `CLOUD_NAME`, `API_KEY` and `API_SECRET` respectively.

> If you're a participant of `open source` competition then you don't need to register for any service and you'll get the values through our technical support.

1. Run `$ npm run dev-start` to start serving the app (front & back), then go to `http://localhost:3000` to view the front and start using the back, it is started already.

## Structure

The folder structure of the application.

> The front app is modular, every module encapsulates its own components and services. Each module contains `components` folder which has the presentational components and also pages, also the module contains the `services` folder if it's dynamic which has all the services that integrate with the `API`.

> Also the back-end is layered, every layer do one thing. The `HTTP Layer` which receives the requests and handles the routes and located in the `controllers` folder, the `Business Logic Layer` which handles the requests and located in the `services` folder and finally the `Data Layer` which contains the DB models and interact with the `Business Logic Layer`.

```
.
├── config - contains all the configurations of the back
│   └── cloudinary.js - configure the image uploading via cloudinary
├── CONTRIBUTING.md
├── controllers - control the routes of the API and handles it via corresponding service class
│   ├── announcements.controller.js
│   ├── committees.controller.js
│   └── users.controller.js
├── dashboard - the front-end of the dashboard
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx - contains the configurations of the routes
│   │   ├── configurations - contains all the configurations of the front
│   │   │   ├── admin-routes.ts - the list of the routes of the dashboard
│   │   │   ├── crud.service.ts - the core class for crud operations that all other services inherit from it
│   │   │   └── interfaces - the interfaces of the objects and classes
│   │   │       ├── achievement.interface.ts
│   │   │       ├── announcement.interface.ts
│   │   │       ├── committee.interface.ts
│   │   │       ├── feedback.interface.ts
│   │   │       ├── route.interface.ts
│   │   │       └── user.interface.ts
│   │   ├── index.tsx - the entry point of the front
│   │   ├── modules - all the business logic of the app (components, services, ...etc)
│   │   │   ├── achievements
│   │   │   │   ├── components
│   │   │   │   │   ├── form
│   │   │   │   │   │   ├── index.tsx
│   │   │   │   │   │   └── style.css
│   │   │   │   │   └── section
│   │   │   │   │       ├── index.tsx
│   │   │   │   │       └── style.css
│   │   │   │   └── services
│   │   │   │       └── achievements.service.ts
│   │   │   ├── admin-home-page
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.css
│   │   │   ├── announcements
│   │   │   │   ├── components
│   │   │   │   │   ├── form
│   │   │   │   │   │   ├── index.tsx
│   │   │   │   │   │   └── style.css
│   │   │   │   │   └── page
│   │   │   │   │       ├── index.tsx
│   │   │   │   │       └── style.css
│   │   │   │   └── services
│   │   │   │       └── announcement.service.ts
│   │   │   ├── committees
│   │   │   │   ├── components
│   │   │   │   │   ├── committeeForm
│   │   │   │   │   │   ├── index.tsx
│   │   │   │   │   │   └── style.css
│   │   │   │   │   └── committeesListPage
│   │   │   │   │       └── index.tsx
│   │   │   │   └── services
│   │   │   │       └── committee.service.ts
│   │   │   ├── feedbacks
│   │   │   │   ├── components
│   │   │   │   │   ├── form
│   │   │   │   │   │   ├── index.tsx
│   │   │   │   │   │   └── style.css
│   │   │   │   │   └── section
│   │   │   │   │       ├── index.tsx
│   │   │   │   │       └── style.css
│   │   │   │   └── services
│   │   │   │       └── feedbacks.service.ts
│   │   │   └── users
│   │   │       ├── components
│   │   │       │   ├── loginPage
│   │   │       │   │   ├── index.tsx
│   │   │       │   │   └── style.css
│   │   │       │   ├── userForm
│   │   │       │   │   ├── index.tsx
│   │   │       │   │   └── style.css
│   │   │       │   ├── userProfile
│   │   │       │   │   ├── index.tsx
│   │   │       │   │   └── style.css
│   │   │       │   └── usersListPage
│   │   │       │       └── index.tsx
│   │   │       └── services
│   │   │           └── user.service.ts
│   │   ├── react-app-env.d.ts - contains typescript configurations for third party libraries
│   │   └── shared - the components & services used on different places of the app
│   │       ├── admin-header
│   │       │   ├── index.tsx
│   │       │   └── style.css
│   │       ├── admin-layout
│   │       │   ├── index.tsx
│   │       │   └── style.css
│   │       ├── admin-sidebar
│   │       │   ├── index.tsx
│   │       │   └── style.css
│   │       ├── admin-table
│   │       │   ├── index.tsx
│   │       │   └── style.css
│   │       ├── image-input
│   │       │   └── index.tsx
│   │       ├── Input
│   │       │   ├── index.js
│   │       │   └── style.css
│   │       ├── loading
│   │       │   ├── index.tsx
│   │       │   └── style.css
│   │       └── services
│   │           ├── uploadImage.service.ts
│   │           └── validation.service.ts
│   ├── Tips.md
│   └── tsconfig.json - configures typescript in the app
├── ecosystem.config.js - contains configurations for the project manager (pm2) for production
├── helpers - all the helper functions used in the app
│   └── verifyToken.js
├── index.js - the entry point of the back
├── LICENSE
├── models - the DB models
│   ├── Achievement.model.js
│   ├── Announcement.model.js
│   ├── Committee.model.js
│   ├── Feedback.model.js
│   └── User.model.js
├── package.json
├── package-lock.json
├── public - the static files that will be served for production
├── README.md
├── services - the services that handles the API requests
│   ├── achievement
│   │   └── achievement.service.js
│   ├── announcement
│   │   └── announcement.service.js
│   ├── committee
│   │   └── committee.service.js
│   ├── core.service.js
│   ├── feedback
│   │   └── feedback.service.js
│   └── user
│       └── user.service.js
└── TODOs.md
```

## Contribution

Follow the guides mentioned in the [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
