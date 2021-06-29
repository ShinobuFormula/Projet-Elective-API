# Projet-Elective-API
 
## Project setup
```
cd API express

npm install
```

## Start the API
```
npm start
```

## Routes

### User routes

##### localhost:3000/user/ 

| Type | Route | Data To Send | Data Received |
| ------ | ------ | ------ | ------ |
| GET | / | ------ | all users : JSON |
| GET | /:type | ------ | all users of a type : JSON |
| GET | /:type/:id | ------ | a user : JSON |
| GET | /email/:type/:email | ------ | a user : JSON |
| POST | /verify | a cookie |  message : String |
| POST | /create/:type | user : JSON | the created user : JSON |
| POST | /create/:type/:sponsor | user : JSON | the created user : JSON |
| POST | /login/:type | email & password : json | a user : JSON, a cookie with a token|
| PUT | /:type/:id | a user : JSON | the updated user : JSON |
| DELETE | /:type/:id | ------ | message : String |
| DELETE | /log/:id | ------ | message : String |

### Menu routes

##### localhost:3000/menu/ 

| Type | Route | Data To Send | Data Received |
| ------ | ------ | ------ | ------ |
| GET | / | ------ | all menus : JSON |
| GET | /:id | ------ | a user : JSON |
| GET | /restaurant/:id | ------ | All menus from a restaurant : JSON |
| POST | / | menu : JSON |  the created menu : JSON |
| POST | /cart/ | menus & articles id : array | all the menus & articles : JSON |
| PUT | /:id | a menu : JSON | the updated menu : JSON |
| DELETE | /:id | ------ | message : String |


### Article routes

##### localhost:3000/article/ 

| Type | Route | Data To Send | Data Received |
| ------ | ------ | ------ | ------ |
| GET | / | ------ | all articles : JSON |
| GET | /:id | ------ | an article : JSON |
| GET | /restaurant/:id | ------ | All articles from a restaurant : JSON |
| POST | / | article : JSON |  the created article : JSON |
| PUT | /:id | an article : JSON | the updated article : JSON |
| DELETE | /:id | ------ | message : String |


### Order routes

##### localhost:3000/order/ 

| Type | Route | Data To Send | Data Received |
| ------ | ------ | ------ | ------ |
| GET | / | ------ | all orders : JSON |
| GET | /:id | ------ | an order : JSON |
| GET | /deliver/:id | ------ | message : String |
| GET | /accept/:id/:userID | ------ | message : String |
| GET | /user/:userID | ------ | All orders for a customer : JSON |
| POST | / | order : JSON |  the created order : JSON |
| PUT | /:id | an order : JSON | the updated order : JSON |
| DELETE | /:id | ------ | message : String |
