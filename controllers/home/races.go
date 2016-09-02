package home

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
)

type RaceController struct {
	beego.Controller
}

type RaceListResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Data []models.Race `json:"races"`
}

func (this *RaceController) GetRaces() {
	user := this.GetSession("user")
	if user != nil {
		resp := RaceListResp{Success: true, Error: ""}
		resp.Data = models.GetAllRaces()
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}