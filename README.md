# capstone






### Run locally
`heroku local web`


### Making Frontend Changes Locally
1. Delete the `build` folder. 
2. Delete the `staticfiles` folder. 
3. Run `yarn build`. 
4. Move the `scoring-app/build` folder to root. 
5. Run `python3 manage.py collectstatic`. 
6. Run `heroku local web` to restart the app. 