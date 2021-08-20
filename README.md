## Full Stack application [ React - Go - Mysql ]


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
go build -o server

./server
```

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

connetion string formate will be

```
<username>:<password>@tcp(127.0.0.1:3306)/<schema name>
```


2. we are using sass so install [this](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) vs code extention to compile sass to css. 