package home

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
//	"encoding/json"
//	"fmt"
)

type BackgroundsController struct {
	beego.Controller
}

type BgListResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Data []models.Background `json:"backgrounds"`
}

func (this *BackgroundsController) GetBackgrounds() {
	user := this.GetSession("user")
	if user != nil {
		resp := BgListResp{Success: true, Error: ""}
		resp.Data = models.GetBackgroundList()
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}