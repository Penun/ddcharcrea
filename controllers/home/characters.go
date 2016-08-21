package home

import (
	"github.com/Penun/DDCharCrea/models"
	"github.com/astaxie/beego"
)

type CharacterController struct {
	beego.Controller
}

type CharGetResponse struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Data []models.Playchar `json:"playchars"`
}

func (this *CharacterController) Get() {
	user := this.GetSession("user")
	if user != nil {
		resp := CharGetResponse{Success: true, Error: ""}
		resp.Data = models.GetChars_UserId(user.(models.User).User_id)
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}