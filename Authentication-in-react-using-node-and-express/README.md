# Single page application with react, node and express
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

After all depencies installation, navigate to "server" folder and type

run : *node server*

When server starts running, then

3. run : *NPM run start*

It will automatically open the chrome browser and will open the website. When ever you change any code, it will 
compile automatically and refresh the page.

When you run the app on the brower, the output would be 

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Show-bootstrap-modal-on-button-click/output.png?raw=true "Bootstrap modal")

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/home-page.png?raw=true "Bootstrap modal")

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/home-submit.png?raw=true "Bootstrap modal")

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/home-submit-error.png?raw=true "Bootstrap modal")

When you submit correct email and password, system will take you to dashboard

![Alt text](https://raw.githubusercontent.com/amir-saeed/ReactJs/master/Authentication-in-react-using-node-and-express/Demo/dashboard.png?raw=true "Bootstrap modal")



### Dependencies
This project use Babel, webpack, react, react-dom, react-router and bootstrap, jquery
