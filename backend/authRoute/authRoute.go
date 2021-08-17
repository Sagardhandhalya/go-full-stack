package authRoute

import (
	"encoding/json"
	"net/http"
)

type Res struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	res := Res{"Login success!!", "ok"}
	json.NewEncoder(w).Encode(res)
}

func HandleLogOut(w http.ResponseWriter, r *http.Request) {
	res := Res{"Logout success!!", "ok"}
	json.NewEncoder(w).Encode(res)
}

func HandleSignUp(w http.ResponseWriter, r *http.Request) {
	res := Res{"signUp success!!", "ok"}
	json.NewEncoder(w).Encode(res)
}
