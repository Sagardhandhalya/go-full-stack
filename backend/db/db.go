package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

type Relative struct {
	Id        int32  `json:"id"`
	Name      string `json:"name"`
	City      string `json:"city"`
	ContactNo string `json:"contactNo"`
	PhotoUrl  string `json:"photoUrl"`
}

type Relation struct {
	P1   int32  `json:"p1"`
	P2   int32  `json:"p2"`
	Name string `json:"name"`
}

var Db *sql.DB
var err error

func ConnectToDb() (*sql.DB, error) {

	if Db == nil {

		Db, err = sql.Open("mysql", "root:9081606040@tcp(127.0.0.1:3306)/RD")

		if err != nil {
			log.Fatal("not able to connect to database ")
			panic(err.Error())
		}

		err = Db.Ping()
		if err != nil {
			panic(fmt.Sprintf("error in database connetion %s", err.Error()))
		} else {

			fmt.Println("conneted to databse -->")
		}
	}

	return Db, err
}
