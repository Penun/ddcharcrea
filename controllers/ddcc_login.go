package controllers

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
	"crypto/sha1"
	"encoding/base64"
	"io"
	"fmt"
)

type LoginController struct {
	beego.Controller
}

type UpdateResponse struct {
	Success bool `json:"success"`
	Error string `json:"error"`
}

func (this *LoginController) Get() {
	user := this.GetSession("user")
	if user != nil {
		this.Redirect("/main", 302)
	}
	hasher := sha1.New()
	io.WriteString(hasher, "ddcharcrea")
	io.WriteString(hasher, beego.AppConfig.String("salt"))
	u_pass := base64.URLEncoding.EncodeToString(hasher.Sum(nil))
	fmt.Println(u_pass)
	this.TplName = "login.tpl"
}

func (this *LoginController) Post() {
	user := this.GetSession("user")
	if user != nil {
		this.Redirect("/main", 302)
	} else {
		var user models.User
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

func (this *LoginController) Logout() {
	user := this.GetSession("user")
	if user != nil {
		this.DelSession("user")
		response := UpdateResponse{Success: true, Error: ""}
		this.Data["json"] = &response
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}