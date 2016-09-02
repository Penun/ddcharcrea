package home

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
//	"fmt"
)

type ClassesController struct {
	beego.Controller
}

type ClassGetRequest struct {
	P_in int `json:"p_in"`
	ClassBuild_id int `json:"class_build_id"`
}

type ClassGetChResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	P_in int `json:"p_in"`
	Data []models.CbChosenProficiency `json:"cb_chosen_proficiencies"`
}

func (this *ClassesController)  ChosenProficiencies() {
	user := this.GetSession("user")
	if user != nil {
		var cGetReq ClassGetRequest
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &cGetReq)
		resp := ClassGetChResp{Success: false, Error: "", P_in: cGetReq.P_in}
		if err == nil {
			resp.Success = true
			resp.Data = models.GetCbChosenProficiencies(cGetReq.ClassBuild_id)
		} 
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func (this *ClassesController) GivenProficiencies() {
	user := this.GetSession("user")
	if user != nil {
		this.Redirect("/main", 302)
	} else {
		this.Redirect("/", 302)		
	}
}