package home

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
//	"fmt"
)

type ProficienciesController struct {
	beego.Controller
}

type BgProfSkillRequest struct {
	P_in int `json:"p_in"`
	U_in int `json:"u_in"`
	Background_id int64 `json:"background_id"`
}

type ClassGetRequest struct {
	P_in int `json:"p_in"`
	U_in int `json:"u_in"`
	ClassBuild_id int64 `json:"class_build_id"`
}

type ClassProfReq struct {
	C_in int `json:"c_in"`
	Class_id int64 `json:"c_id"`
}

type BgProfSkillResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	P_in int `json:"p_in"`
	U_in int `json:"u_in"`
	Data []models.BackgroundProficiency `json:"background_proficiencies"`
}

type ClassGetChResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	P_in int `json:"p_in"`
	U_in int `json:"u_in"`
	Data []models.CbChosenProficiency `json:"cb_chosen_proficiencies"`
}

type SkillProfResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Data []models.Proficiency `json:"proficiencies"`
}

type ClassProfResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	C_in int `json:"c_in"`
	Data []models.ClassProficiency `json:"class_profs"`
}

func (this *ProficienciesController) BGProficiencies() {
	user := this.GetSession("user")
	if user != nil {
		var bPrSkRe BgProfSkillRequest
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &bPrSkRe)
		resp := BgProfSkillResp{Success: false, Error: "", P_in: bPrSkRe.P_in, U_in: bPrSkRe.U_in}
		if err == nil {
			resp.Success = true;
			resp.Data = models.GetBackgroundProficiencies(bPrSkRe.Background_id)
		} 
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func (this *ProficienciesController) ChosenProficiencies() {
	user := this.GetSession("user")
	if user != nil {
		var cGetReq ClassGetRequest
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &cGetReq)
		resp := ClassGetChResp{Success: false, Error: "", P_in: cGetReq.P_in, U_in: cGetReq.U_in}
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

func (this *ProficienciesController) SkillProficiencies() {
	user := this.GetSession("user")
	if user != nil {
		resp := SkillProfResp{Success: true, Error: ""}
		resp.Data = models.GetSkillProficiencies()
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func (this *ProficienciesController) ClassProficiencies() {
	user := this.GetSession("user")
	if user != nil {
		var cGetReq ClassProfReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &cGetReq)
		resp := ClassProfResp{Success: false, Error: "", C_in: cGetReq.C_in}
		if err == nil {
			resp.Success = true
			resp.Data = models.GetClassProficiencies(cGetReq.Class_id)
		} 
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}