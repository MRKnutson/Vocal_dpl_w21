![Logo](https://res.cloudinary.com/djhlv2nfc/image/upload/v1643757279/Vocal/Images/6_e44mfu.png)

# Vocal Audio Journal

Vocal is a voice journaling app that allows users to easily record thooughts in an audible format and add associated metadata including overall mood, notes about journal entry, tags, and pictures.

## Authors

- [@asherbay](https://github.com/asherbay)
- [@michaelrknutson](https://github.com/mrknutson)
- [@dennisplank](https://github.com/DennyPlank)
- [@rubyreed](https://github.com/rubyreed)

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Installation

Clone down this repository. You will need `ruby`, `rails`, `postgreSQL`, `node` and `yarn` installed globally on your machine.

### Installation:

in rails project:

`bundle`

`rails db:create db:migrate`

in client folder:

`yarn`

### To Start Rails Server:

in rails project:

`rails s -p 3001`

### To Start React Server:

in main rails project:

`yarn start`

To Visit App:

`localhost:3000`

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CLOUD_NAME`

`API_KEY`

`API_SECRET`

## Reflection

This was a 3 week long capstone project built during the DevPoint Labs full-time web development Bootcamp. This project was selected by the authors as it provided a combination of tools they were familiar using while also developing new skills to create parts of the application that they were not taught, such as recording and handling audio files.

The goal of this project was to create an application that allowed users to easily record journal entries while also allowing the authors to showcase both front-end and back in skills while working as a team to meet the requirements set forth by the project manager.

One feature that we wanted to add was a voice to text feature that would allow users to record journal entries but then render them back in text format so that users could choose whether they wanted to review previous entries as either audio or text. We found that while this was possible, either the processing time was too long to be feasible or access to the asynchronous API's required payment so the decision was made to table this in favor of working on other features.

This project gave us experience with several libraries including devise-token-auth, cloudinary, react, react-bootstrap, Material UI, @nivo, filepond, react-chrono, react-router, react-vis, recharts, and react-voice-recorder among others.

## Tech Stack

**Client:**
React, React-Router-Dom (v6), Bootstrap UI (v5), Styled-Components (v5), axios, devise-axios (v1)

**Server:**
faker, pry-rails, cloudinary, devise-token-auth
