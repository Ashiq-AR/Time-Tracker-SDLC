# Time Tracker Application 

The application where you can track, manage and analyze the time that you have tracked throughout.

## Design 

### Project setup

* The assets folder is created and contains necessary images and other assets needed for projects

* The src folder is created where the server will be running and the static files for dashboard app are created inside the it 

* STATIC FILES - index.html , style.css , scripts.js.

* In src , login-signup folder is created and static files for login and signup functionalities are hosted there.

* For modularized js files, a js files folder is created and all files are kept there

### Folder structure

    Time-Tracker-SDLC
    |
    │   package.json
    │   README.md
    │
    ├───assets
    │   └───images
    ├───docs
    │       DESIGN.md
    │       sequence-diagram.plantuml
    │
    └───src
        │   index.html
        │   script.js
        │   style.css
        │
        ├───js-files
        ├───login-signup-files
        │       login-signup.css
        │       login-signup.html
        │       login-signup.js
        │
        ├───server
        │       server.cjs
        │
        ├───tests
        │   └───unit
        └───utils
            │   dom-utils.js
            │   theme.css
            │
            ├───data-storage-files
            │       time-entries.json
            │       users.json
            │       
            └───server-side-scripts

### Functionalities 

* When the page is searched by finding server address. it lands in login/signup page where the user can login or sign up with their email accounts

* A users.json file is maintained for maitaining the signed up users information

* After the user signs up or logs in , user is redirected to the home page or dashboard page.

* The dashboard page consists of UI elements for adding, filtering and analysis functionalites for user tracked time entries.

* The user can track the time by starting, pausing and stoping the timer or the user can also add time entry by specifying from and to time.

* The time-entries.json file contains all the time entries updated by the user

* The user can retrieve time entries from that file by filtering out by ,
    * Date
    * Week
    * Month

* The user can do analysis by analyzing the analysis chart and get insights on their tracked time.

### End points / API 

### 1. signup 

&nbsp; &nbsp; &nbsp; 
The sign up end-point adds a new user entry in the users.json file

### 2. login

&nbsp; &nbsp; &nbsp; 
The login end-point is used to log in a user by verifying the user email and password from the users.json file

### 3. create-entry

&nbsp; &nbsp; &nbsp; 
The create-entry end-point adds a new entry to the time-entries.json file with necessary payloads like ,

* Task Name
* Task Description
* Time stamps
* Total Duration
* Category

### 4. edit-entry

&nbsp; &nbsp; &nbsp; 
The update-entry end-point is used to change and update the time entry details of a particular detail in the time-entries.json


### 5. delete-entry

&nbsp; &nbsp; &nbsp; 
The delete-entry end-point deletes an added or updated entry from the time-entries.json file

### 6. get-by-date 

&nbsp; &nbsp; &nbsp; 
The get-by-date end-point gets all the tracked time entries for a specific date from the time-entries.json file.

### 7. get-by-week 

&nbsp; &nbsp; &nbsp; 
The get-by-week end-point gets all the tracked time entries for specific week in a month from the time-entries.json file.

### 8. get-by-month 

&nbsp; &nbsp; &nbsp; 
The get-by-month end-point retrieves all tracked time for a particular month from the time-entries.json file.

### Data storage file structure

#### users.json

    "E-mail-Id" : { 
        "Username" : [ string ] , 
        "Password" : [ string ]
    }

#### time-entries.json

    "E-mail-Id" : {
        "year" : {
            "monthIndex" : {
                "date" : {
                    "uuid" : {
                        "taskName" : [ string ] ,
                        "taskDescription" : [ string ] ,
                        "timeStamp" : [ [from(string)],[to(string)] ] ,
                        "duration" : [ string ] ,
                        "category" : [ string ] ,
                    }
                }
            }
        }
    }

### Tech Stack used

#### Front end 
+ HTML5
+ Vannilla CSS3
+ Vannilla Java Script

#### Back end
+ Node JS

### Packages Used 

+ Express - to simply requests
+ Nodemon - to rerun server when js files change
+ Jest - for unit testing