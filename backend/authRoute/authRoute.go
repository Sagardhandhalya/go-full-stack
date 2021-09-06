package authRoute

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/dgrijalva/jwt-go"
)

type Res struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, fmt.Sprintf("Body Read Error : %v", err), http.StatusInternalServerError)
		return
	}
	type User struct {
		EmailId string `json:"email_id"`
	}
	var usr User
	err = json.Unmarshal(reqBody, &usr)
	if err != nil {
		http.Error(w, fmt.Sprintf("Request Body parse error : %v", err), http.StatusBadRequest)
		return
	}
	os.Setenv("ACCESS_SECRET", "jdnfksdmfksd")
	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["email_id"] = usr.EmailId
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	AccessToken, err := at.SignedString([]byte(os.Getenv("ACCESS_SECRET")))
	if err != nil {
		return
	}
	res := Res{AccessToken, "ok"}
	json.NewEncoder(w).Encode(res)
}

func HandleSignUp(w http.ResponseWriter, r *http.Request) {
	res := Res{"signUp success!!", "ok"}
	json.NewEncoder(w).Encode(res)
}
