package home

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type UsersController struct {
	beego.Controller
}

type UserGetResponse struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Data []orm.Params `json:"users"`
}

func (this *UsersController) Get() {
	user := this.GetSession("user")
	if user != nil {
		resp := UserGetResponse{Success: true, Error: ""}
		resp.Data = models.GetUsers(user.(models.User).Clearance)
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}