package controllers

import (
	"github.com/Penun/DDCharCrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
	"crypto/sha1"
	"encoding/base64"
	"io"
)

type LoginController struct {
	beego.Controller
}

type UpdateResponse struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Response string `json:"response"`
}

func (this *LoginController) Get() {
	user := this.GetSession("user")
	if user != nil {
		this.Redirect("/main", 302)
	}
	this.TplName = "login.tpl"
}

func (this *LoginController) Post() {
	user := this.GetSession("user")
	if user != nil {
		this.Redirect("/main", 302)
	} else {
		var user models.Users
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &user)

		if err != nil {
			response := UpdateResponse{Success: false, Error: err.Error()}
			this.Data["json"] = &response
		} else {
			hasher := sha1.New()
			io.WriteString(hasher, user.Password)
			io.WriteString(hasher, beego.AppConfig.String("salt"))
			user.Password = base64.URLEncoding.EncodeToString(hasher.Sum(nil))
			success := models.TryLogin(&user)
			response := UpdateResponse{Success: success, Error: ""}
			if success {
				this.SetSession("user", user)
			} else {
				response.Error = "Invalid Login"
			}
			this.Data["json"] = &response
		}
		this.ServeJSON()
	}
}