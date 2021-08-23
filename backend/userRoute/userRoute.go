package userRoute

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/sagarsearce/go-mysql-react/db"
)

var Db *sql.DB

func init() {
	Db, _ = db.ConnectToDb()
}

// add new person to the database
func HandleAddPerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Body Read Error : %v", err), http.StatusInternalServerError)
		return
	}
	var person db.Person
	err = json.Unmarshal(reqBody, &person)

	if err != nil {
		http.Error(w, fmt.Sprintf("Request Body parse error : %v", err), http.StatusBadRequest)
		return
	}
	fmt.Println("new person", person)
	_, err = Db.Exec("INSERT INTO people(name,city,contactNo,photoUrl) values(?,?,?,?)", person.Name, person.City, person.ContactNo, person.PhotoUrl)
	if err != nil {
		http.Error(w, fmt.Sprintf("ERROR in creating person %s", err.Error()), http.StatusInternalServerError)
		return
	}
	var newPerson db.Person
	res, err := Db.Query("SELECT * FROM RD.people order by id Desc limit 1")
	if err != nil {
		http.Error(w, fmt.Sprintf("ERROR in creating person %s", err.Error()), http.StatusBadRequest)
		return
	}
	defer res.Close()
	for res.Next() {
		err = res.Scan(&newPerson.Id, &newPerson.Name, &newPerson.City, &newPerson.ContactNo, &newPerson.PhotoUrl)
		if err != nil {
			http.Error(w, fmt.Sprintf("ERROR in creating person %s", err.Error()), http.StatusInternalServerError)
			return
		}
	}
	json.NewEncoder(w).Encode(newPerson)
}

// delete person with id get from the http request id params
func HandleDeletePerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "id parameter is not found", http.StatusBadRequest)
		return
	}
	result, err := Db.Exec("DELETE FROM people WHERE id=?", id)
	if err != nil {
		http.Error(w, fmt.Sprintf("ERROR in deleting person %s", err.Error()), http.StatusInternalServerError)
		return
	}
	rows, _ := result.RowsAffected()
	fmt.Printf("person deleted. %d rows affected !", rows)
	w.WriteHeader(http.StatusOK)
}

// update person with the given id
func HandleUpdatePerson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "id parameter is not found", http.StatusBadRequest)
		return
	}
	fmt.Println(id)
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Body Read Error : %v", err), http.StatusInternalServerError)
	}
	var body map[string]string
	err = json.Unmarshal(reqBody, &body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Request Body parse error : %v", err), http.StatusBadRequest)
		return
	}
	fmt.Printf(body["name"])
	cols := ""

	for key, val := range body {
		cols = cols + key + "=" + "'" + val + "'" + ","
	}
	f := cols[:len(cols)-1]

	_, err = Db.Exec(fmt.Sprintf("UPDATE people SET %s where people.id=?", f), id)
	if err != nil {
		http.Error(w, fmt.Sprintf("ERROR in deleting person %s", err.Error()), http.StatusBadRequest)
		return
	}

	var person db.Person
	res, err := Db.Query("SELECT * FROM people where id=?", id)
	if err != nil {
		http.Error(w, fmt.Sprintf("ERROR in updating person %s", err.Error()), http.StatusBadRequest)
		return
	}
	defer res.Close()
	for res.Next() {
		err = res.Scan(&person.Id, &person.Name, &person.City, &person.ContactNo, &person.PhotoUrl)
		if err != nil {
			http.Error(w, fmt.Sprintf("ERROR in updating person %s", err.Error()), http.StatusInternalServerError)
			return
		}
	}
	json.NewEncoder(w).Encode(person)
}

// add relation between 2 person
func HandleAddRelation(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Body Read Error : %v", err), http.StatusInternalServerError)
		return
	}
	var relation db.Relation
	err = json.Unmarshal(reqBody, &relation)

	if err != nil {
		http.Error(w, fmt.Sprintf("Request Body parse error : %v", err), http.StatusBadRequest)
		return
	}
	fmt.Println("new Person", relation)
	result, err := Db.Exec("INSERT INTO relations(p1,p2,name) values(?,?,?)", relation.P1, relation.P2, relation.Name)
	if err != nil {
		http.Error(w, fmt.Sprintf("ERROR in creating relation %s", err.Error()), http.StatusInternalServerError)
		return
	}
	rows, _ := result.RowsAffected()
	fmt.Printf("person crated. %d rows affected !", rows)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(relation)
}

// returns all persona avalable in the database
func GetPersons(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var Persons []db.Person
	rows, err := Db.Query("SELECT * FROM people")
	if err != nil {
		http.Error(w, fmt.Sprintf("Error in fetching all Persons %s", err.Error()), http.StatusInternalServerError)
		return
	}
	for rows.Next() {
		var r db.Person
		err := rows.Scan(&r.Id, &r.Name, &r.City, &r.ContactNo, &r.PhotoUrl)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error in fetching all Persons %s", err.Error()), http.StatusInternalServerError)
			return
		}
		Persons = append(Persons, r)
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(Persons)
}

// return relation of a specific person, with given id
func GetRelations(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "id parameter is not found", http.StatusBadRequest)
		return
	}
	var relations []db.Relation
	rows, err := Db.Query("SELECT * FROM relations where p1=?", id)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error in fetching all Persons %s", err.Error()), http.StatusInternalServerError)
		return
	}
	for rows.Next() {
		var r db.Relation
		err := rows.Scan(&r.P1, &r.P2, &r.Name)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error in fetching all Persons %s", err.Error()), http.StatusInternalServerError)
			return
		}
		relations = append(relations, r)
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(relations)
}

func Add(a int, b int) int {
	return a + b
}
