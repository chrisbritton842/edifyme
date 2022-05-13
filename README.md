# EdifyMe
<img width="1583" alt="EdifyMe Landing Page" src="https://user-images.githubusercontent.com/81934894/168183734-cfe935a2-d5f5-4907-b73b-6cad8545c5a5.png">

A clone of Quora, EdifyMe is a place for college students to post academic questions and answers.

| [Live Site](https://edifyme.herokuapp.com/) | [MVP Feature List](https://github.com/chrisbritton842/edifyme/wiki/MVP-Feature-List) | [Database Schema](https://github.com/chrisbritton842/edifyme/wiki/Database-Schema) |

# Technologies Used

EdifyMe is built with a React / Redux frontend and an Express backend. The application uses the Sequelize ORM on a PostgreSQL database.

<img src="https://user-images.githubusercontent.com/81934894/167922066-3a466e42-731b-4bdf-98b4-8b9971991ad2.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167921070-fc1ea1c2-195e-4ff1-8256-876145615140.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167923126-4e788245-c2be-41d9-82b6-7c5110c1b214.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167939319-40ad331b-5718-4d67-a410-ed75adfffebd.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167940488-b4fd2129-f1a2-4a3f-bc48-437e5c7e3315.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167940850-cd9b586d-7e4b-4a44-8665-c1aa80c6c348.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167941258-11a0b456-b4f6-44ab-b984-7665ab3090f7.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167941591-88b41548-0f6b-4d81-862e-624836326836.svg" width="25" height="25"><img src="https://user-images.githubusercontent.com/81934894/167941934-d8a97a26-1cfc-41d6-b997-10950331528e.svg" width="25" height="25">

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
## Full CRUD functionality for Questions

![2022-05-12 21 33 54](https://user-images.githubusercontent.com/81934894/168212012-ccab2719-becc-4a77-b7e3-beb4081ace08.gif)

Authenticated users can create, read, update, and delete questions without page reloads.
  
## Full CRUD functionality for Answers

![2022-05-12 21 56 31](https://user-images.githubusercontent.com/81934894/168214121-a06eb4e9-5792-48ca-ae99-6915ff06a85d.gif)

# Conclusion

This project was a good exercise in replicating the style of Quora and its functionality with the aim of creating a fully dynamic, single page application. EdifyMe proved to be a valuable learning experience as to the importance of having a simple and well-organized redux state since correctly relating users, questions, and answers was sometimes tricky. Considerable time was also taken to implement robust user authentication using JWTs with related authentication middleware as well as user model scopes and user model methods to add extra protection to user information.
