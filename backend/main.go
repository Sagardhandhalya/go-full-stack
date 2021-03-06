/*
Package main defines web APIs to be used with frontend.
this package involves API for CRUD opration on person, relation
and also implement authentication.

routes :>>

	 / := front end index.html
	 	/api
			/auth
				/login
				/logout
				/signout

			/person
				/
				/add
				/update
				/delete
				/relations

			/relation
				/add
*/

package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/sagarsearce/go-mysql-react/authRoute"
	"github.com/sagarsearce/go-mysql-react/userRoute"
)

func main() {
	route := mux.NewRouter()
	api := route.PathPrefix("/api").Subrouter()

	// @Todo :

	auth := api.PathPrefix("/auth").Subrouter()
	auth.HandleFunc("/login", authRoute.HandleLogin).Methods("GET")
	auth.HandleFunc("/signup", authRoute.HandleSignUp).Methods("POST")

	userAction := api.PathPrefix("/person").Subrouter()
	userAction.HandleFunc("/", IsAuthorized(userRoute.GetPersons))
	userAction.HandleFunc("/add", IsAuthorized(userRoute.HandleAddPerson)).Methods("POST")
	userAction.HandleFunc("/update", IsAuthorized(userRoute.HandleUpdatePerson)).Methods("POST")
	userAction.HandleFunc("/delete", IsAuthorized(userRoute.HandleDeletePerson)).Methods("GET")
	userAction.HandleFunc("/relations", IsAuthorized(userRoute.GetPersonRelations)).Methods("GET")

	relationAction := api.PathPrefix("/relation").Subrouter()
	relationAction.HandleFunc("/", userRoute.GetRelations).Methods("GET")
	relationAction.HandleFunc("/add", userRoute.HandleAddRelation).Methods("POST")

	staticFileDir := http.Dir("./build")

	// handle cors
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
	})
	route.PathPrefix("/").Handler(http.FileServer(staticFileDir))
	fmt.Print("Runnig  server on 8000...\n")
	log.Fatal(http.ListenAndServe(":8000", c.Handler(route)))
}
