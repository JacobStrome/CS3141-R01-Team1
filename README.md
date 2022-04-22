# CS3141-R01-Team1

This is the team software project repository for section 1 team 1.

## Backend Introduction

The backend of the scheduling application utilizes django a python based web backend platform.
In order to run the webserver please use the commands:

`pip install -r requirements.txt` to install the nessesary python modules<br/>
`python3 -m manage.py pullCourses` to get course information from banweb<br/>
`python3 -m manage.py runserver` to start up the webserver<br/>

After starting up the server multiple endpoints will be exposed including:

***http://141.219.232.222:8000/*** which directs to the production react application (NOTE THIS IS NOT A LIVE EDIT ENVIRONMENT)<br/>
***http://141.219.232.222:8000/api/classes*** which returns json data with course information<br/>
***http://141.219.232.222:8000/admin*** which allows access to the database (NOTE ACCOUNT REQUIRED BEFORE ENTRY SEE BELOW)<br/>

### Backend Admin Account Creation

In order to create an account to access the internals of the database the server must first be shutdown then the following command must be run

`python3 -m manage.py createsuperuser`

After running this command you will be prompted for login information for your new account
after creation the server can be restarted and you should have access to the new account
with the username/password you defined (NOTE RESETTING THE DATABASE WILL DELETE YOUR PASSWORD)

### Reseting the Database

If for some reason the database needs to be rebuilt there are a couple of actions required to rebuild it
first the migrations dirctories within schedulerBackend/api needs to be deleted along with schedulerBackend/db.sqlite3 .
Once these files are deleted the following commands must be run in order:

`python3 -m manage.py makemigrations api`<br/>
`python3 -m manage.py migrate`<br/>
`python3 -m manage.py pullcourses`<br/>

After running these commands the new database should be built however if you had an admin account you will need to recreate it
see the above section for more inforamtion

### Testing

In order to run unit tests a single command must be run:

`python3 -m manage.py test`

The test will output the timing information for the tests along with any failures that occured

## Frontend Introduction

The frontend of the application uses the react framework on top of nodejs.
In order to run the front end application in development mode please use the commands:

`npm install` to install all nessesary libraries including react and webpack<br/>
`npm start` in order to start up the development server and open a tab to the application<br/>

If there are no problems in compilation the application should have opened a tab in an open web browser
if the tab has not been opened the application can be found at **_http://localhost:3000_**

### Building Production Frontend

In order to build the production version of the front end for final deployment the following commands must be run:

`npm install` to install all nessesary libraries including react and webpack<br/>
`npm run build` in order to start build the production version<br/>

The outputted production build can be found at react-frontend/build with react-frontend/build/index.html being the entrypoint
for the application. If the backend server is running the production build can also be found at ***http://141.219.232.222:8000/***

### Filling in Backend information

In order to levarage the backend both applications must be run concurrently after starting the backend server
and the frontend development environement live updates should work at **http://localhost:3000\***<br/>
(NOTE ***http://141.219.232.222:8000/*** WILL SHOW THE PRODUCTION APPLICATION AND LIVE EDITS DO NOT WORK)

### Testing

In order to run the frontend unit tests the following commands must be run:

`npm install` to install all nessesary libraries including react and webpack<br/>
`npm test` in order to run the unit tests<br/>

This run the tests and output the results to the console. In order to get the code coverage results the following command must be run:

`npm test -- --coverage`

This will output the coverage information for the testing suite alongside the test results
