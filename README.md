## Full Stack application [ React - Go - Mysql ]

### Project Descreption 

The main idea was of the project is to visualize self-relation on a person table, in RDBMS we use self-relation to store the graph in the database, database contains only 2 tables one is the person and another is relation which mapping for 2 person. so we can visualize the connection of a person and all person and their connection as a graph.

![Screenshot 2021-08-23 at 10 17 46 PM](https://user-images.githubusercontent.com/80812847/130488666-12f14f03-6967-4ac7-a1ba-3a9e23423344.png)

![Screenshot 2021-08-25 at 1 13 51 AM](https://user-images.githubusercontent.com/80812847/130679948-ea9b4b50-ec5d-4bbf-810a-4a73b60bbd55.png)

### Future plan 

we store data in terms of persons and their connection so we can apply graph algorithms to find solutions to problems like person 1 is connected with person 2 if yes then find the shortest path, we can show this in the UI graph.


### Project Set up 


Clone this repo with this command 

```js
git clone -b master https://github.com/sagarsearce/go-full-stack.git
```
this will download frontend backend and database folder in a root folder.open terminal at this download location.

Now after downloading of code we have to set up 3 thing

1. Frontend set up
2. backend set up
3. database set up


#### Database set up

we are using mysql database for the project so you have to install mysql server and mysql workbench is good to have.

go to the database folder and there will be a file called database_server.sql copy this sql and run it in you local database, it will create schema and required table.


#### Backend setUp

we are using goLang backend so first step will be install goLang in your system. you can follow this [tutorial](https://youtu.be/76TGhGCOIQM)

1. go the backend folder and install go pkg dependecy.

```
cd backend 
go mod tidy
```

2. to start backend server run this command.

```
go run main.go

```

__If you are on windows machine you might not able to run go binary you need to white list this binary from antivirus.__

#### Frontend set up 

1. go to the frontend folder with and install all npm dependency.
     ```
     cd frontend
     npm install
     ```
2. now to start frontend run this command in frontend folder.
```
npm run start
```
your Ui will run on http://localhost:3000/

### Things update

1. first update your database connetion string in /backend/db/db.go file in the sql.Open function.

connection string formate will be

```
<username>:<password>@tcp(127.0.0.1:3306)/<schema name>
```


2. we are using sass so install [this](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) vs code extention to compile sass to css. 
