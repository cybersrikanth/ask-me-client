# ask-me-client

## Installation

#### Requirements
 * Node Js (Version 12.*)
 * NPM (Version 6.*)
 * React (Version 16.13.1)
 * Linux or Windows server 
 * git
 
#### Setup
* Clone the repositary using `https://github.com/cybersrikanth/ask-me-client.git`
* Run `npm install` to install all the dependencies
* Run `npm start` to start development server
* Open `http://localhost:3000` to view application in development mode
* Run `npm build` to build the application for production.


## Description

* This is a Question/Answer portal.
* Anyone can read all questions and answer.
* Any users can search for questions using hashtags or title.
* To search based on title simply search the word in search bar(eg: who is donald trump?). 
* To search based on tags use # (eg: #pray_for_nesamani).

* Users can signup for account in by going `/signup` endpoint.
* Authorized users can ask questions and reply answer for question.
* New Question can be asked by clicking + icon in top right of the home page.
* Every Question should have Title, Description and optional hashtags `#hashtag`
* Ask, Answer, Edit and Delete will be only shown for authorized users.
* Only resource owner can edit or delete the resource.
