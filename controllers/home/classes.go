package home

import (
	"github.com/Penun/DDCharCrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
//	"fmt"
)

type ClassesController struct {
	beego.Controller
}

type ClassGetRequest struct {
	Playchar_in int `json:"playchar_in"`
	ClassBuild_id int `json:"class_build_id"`
}

type ClassGetChResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Playchar_in int `json:"playchar_in"`
	Data []models.CbChosenProficiency `json:"cb_chosen_proficiencies"`
}

func (this *ClassesController)  ChosenProficiencies() {
	user := this.GetSession("user")
	if user != nil {
		var cGetReq ClassGetRequest
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &cGetReq)
		resp := ClassGetChResp{Success: false, Error: "", Playchar_in: cGetReq.Playchar_in}
		if err == nil {
			resp.Success = true;
			resp.Data = models.GetCbChosenProficiencies(cGetReq.ClassBuild_id)
		} 
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func (this *ClassesController) GivenProficiencies() {
	this.TplName = "main/main.tpl"
}