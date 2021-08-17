package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/sagarsearce/go-mysql-react/userRoute"
)

/*
	 routes :>>
	 /
	 /api
		/api/auth
			/api/auth/login
			/api/auth/logout
			/api/auth/signuo
		/api/user
			/api/user/relative
			/api/user/relative/remove
			/api/user/relative/update
			/api/user/relative/delete
			/api/user/relative/addrelation
	/
	   /index.html

	 1. /api/auth ---> login, create account and logout
	 2. /api/user/* --> all user activity
*/

func main() {
	route := mux.NewRouter()
	api := route.PathPrefix("/api").Subrouter()

	// auth := api.PathPrefix("/auth").Subrouter()
	// auth.HandleFunc("/login", authRoute.HandleLogin)
	// auth.HandleFunc("/logout", authRoute.HandleLogOut)
	// auth.HandleFunc("/signup", authRoute.HandleSignUp)

	userAction := api.PathPrefix("/relative").Subrouter()
	userAction.HandleFunc("/", userRoute.GetRelatives)
	userAction.HandleFunc("/add", userRoute.HandleAddRelative).Methods("POST")
	userAction.HandleFunc("/update", userRoute.HandleUpdateRelative).Methods("POST")
	userAction.HandleFunc("/delete", userRoute.HandleDeleteRelative).Methods("GET")
	userAction.HandleFunc("/addrelation", userRoute.HandleAddRelation).Methods("POST")
	userAction.HandleFunc("/relations", userRoute.GetRelations).Methods("GET")

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
