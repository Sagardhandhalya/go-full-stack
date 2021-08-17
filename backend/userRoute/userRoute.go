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
var err error

func init() {
	Db, _ = db.ConnectToDb()
}

func HandleAddRelative(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Body Read Error : %v", err), http.StatusInternalServerError)
		return
	}
	var relative db.Relative
	err = json.Unmarshal(reqBody, &relative)

	if err != nil {
		http.Error(w, fmt.Sprintf("Request Body parse error : %v", err), http.StatusBadRequest)
		return
	}
	fmt.Println("new relative", relative)
	_, err = Db.Exec("INSERT INTO people(name,city,contactNo,photoUrl) values(?,?,?,?)", relative.Name, relative.City, relative.ContactNo, relative.PhotoUrl)
	if err != nil {
		http.Error(w, fmt.Sprintf("ERROR in creating person %s", err.Error()), http.StatusInternalServerError)
		return
	}
	var person db.Relative
	res, err := Db.Query("SELECT * FROM RD.people order by id Desc limit 1")
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

func HandleDeleteRelative(w http.ResponseWriter, r *http.Request) {
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

func HandleUpdateRelative(w http.ResponseWriter, r *http.Request) {
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

	var person db.Relative
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
	fmt.Println("new relative", relation)
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

func GetRelatives(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var relatives []db.Relative
	rows, err := Db.Query("SELECT * FROM people")
	if err != nil {
		http.Error(w, fmt.Sprintf("Error in fetching all relatives %s", err.Error()), http.StatusInternalServerError)
		return
	}
	for rows.Next() {
		var r db.Relative
		err := rows.Scan(&r.Id, &r.Name, &r.City, &r.ContactNo, &r.PhotoUrl)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error in fetching all relatives %s", err.Error()), http.StatusInternalServerError)
			return
		}
		relatives = append(relatives, r)
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(relatives)
}

func GetRelations(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var relations []db.Relation
	rows, err := Db.Query("SELECT * FROM relations")
	if err != nil {
		http.Error(w, fmt.Sprintf("Error in fetching all relatives %s", err.Error()), http.StatusInternalServerError)
		return
	}
	for rows.Next() {
		var r db.Relation
		err := rows.Scan(&r.P1, &r.P2, &r.Name)
		if err != nil {
			http.Error(w, fmt.Sprintf("Error in fetching all relatives %s", err.Error()), http.StatusInternalServerError)
			return
		}
		relations = append(relations, r)
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(relations)
}
