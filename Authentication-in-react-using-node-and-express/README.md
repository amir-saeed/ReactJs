# Single page application with react, node and express
## Introduction
This is single page application to show that how to validate form on client as well as server side, also fetch IP address of the local user, display it and after sucessful login, redirect user to dashboard, otherwise, show error message.

## Technologies used
1. React / React-dom / React-router
2. Node
3. Express
4. MongoDB / Robomongo
5. Bootstrap
6. HTML / CSS3

## Instructions to run

### Create mongoDB 
install and create mongodb.

Open command prompt with admin rights and 

run : *mongod*, 

create database with the name "users",
create table named "users" and insert the following vlaues as shown in the picture.

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/mongodb.png?raw=true "Mongo DB")



### Run commands
Open two more command prompts / terminals windows (with administrator rights) 

Navigate to this folder

1. run : *NPM install*

2. After all depencies installation, navigate to "server" folder and type

run : *node server*

When server starts running, then

3. run : *NPM run start*

It will automatically open the chrome browser and will open the website. When ever you change any code, it will 
compile automatically and refresh the page.

When you run the app on the brower, the output would be 

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Show-bootstrap-modal-on-button-click/output.png?raw=true "Bootstrap modal")

##### Home Page

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/home-page.png?raw=true "Bootstrap modal")

##### Client side validation on submit

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/home-submit.png?raw=true "Bootstrap modal")

##### Server side error validation on submit

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/home-submit-error.png?raw=true "Bootstrap modal")

##### Dashboard on successful login

When you submit correct email and password, system will take you to dashboard

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/dashboard.png?raw=true "Bootstrap modal")



### Dependencies
This project use Babel, webpack, react, react-dom, react-router and bootstrap, jquery
