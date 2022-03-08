# EdifyMe
This is a clone of Quora. EdifyMe is a place for college students to post class related questions and answers.

# Getting started
1. Clone the repo.
* git clone https://github.com/chrisbritton842/edifyme.git

2. Run npm install in the root directory of the app. This will install all dependencies for both frontend and backend subdirectories.
* npm install

3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL
* CREATE USER \<name> WITH PASSWORD <'password'> CREATEDB
  
4. In the backend directory, use the provided .env.example file to create a .env file.
  
5. In the .env file, enter your username and password that you created in step 3. You will also need to set a port number (e.g., 5000), a database name, database host (loacalhost), JWT secret, and JWT expiration (you can use 604800 for this value - the number of seconds in a week). You can use the following command in a node repl to generate a JWT secret.
  * require("crypto").randomBytes(32).toString("hex");
  
6. In your package.json file, within your frontend directory, add the following proxy using the port number in your .env file for the backend api.
  * "proxy": "http://localhost:5000"
  
7. Create Database, Migrate, and Seed models.
  * npx dotenv sequelize db:create
  * npx dotenv sequelize db:migrate
  * npx dotenv sequelize db:seed:all
  
8. Start the services in the backend directory.
  * npm start
  
9. Start the services in the frontend directory. This should open the application in your default browser. If not, navigate to http://localhost:3000.
  * npm start

10. Use the demo user or create an account to begin using EdifyMe.
  
# Features
  Logged in users can perform the following actions.
  
  * Add/View/Edit/Delete Questions
  * Add/View/Edit/Delete Answers
