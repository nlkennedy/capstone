# Intellisquash

### About
This app is a squash game scoring app originally built for the Tufts Squash team. The application scores and tracks all games, and our main feature is a machine learning model that uses live video to read referee hand signals to aid in scoring the games. Built for Tufts Senior Capstone 2020 - 2021. 

### Team Members
* Ben Bodine
* Radhika Joshi
* Nicole Kennedy
* Harsh Prajapati

### Setup on Your Local Machine
1. `cd <PATH TO DIRECTORY YOU WANT YOUR CODE TO BE IN>`
1. Clone repo: `git clone https://github.com/nlkennedy/referee-signal-recognition.git`
2. `cd referee-signal-recognition`
3. Install backend requirements: `pip3 install -r requirements.txt`
4. Install frontend requirements: `yarn install` (see frontend README for more details)

### Add instructions for database setup

### Run Project on Local Machine
* `heroku local web`
* Go to http://localhost:5000 (or whatever port is used)
* This uses the frontend build of static files, so make sure those are updated (see bullet below)

To run frontend and backend separately for development:
* Frontend: `cd scoring-app && yarn start`
* Backend: `python3 manage.py runserver`
* Go to http://localhost:3000 (or whatever port is used)
* In `/scoring-app/src/components/axios.js`, make sure the `baseURL` corresponds to the correct server (local backend: http://localhost:5000)

### Creating Frontend Build to Serve
This must be done before every deploy and `heroku local web` run to see the new changes. 
1. Delete the `build` folder. 
2. Delete the `staticfiles` folder. 
3. Run `yarn build`. 
4. Move the `scoring-app/build` folder to root. 
5. Run `python3 manage.py collectstatic`. 
6. Run `heroku local web` to restart the app. 