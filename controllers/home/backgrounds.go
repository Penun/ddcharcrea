package home

import (
	"github.com/Penun/DDCharCrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
//	"fmt"
)

type BackgroundsController struct {
	beego.Controller
}

type BgProfSkillRequest struct {
	Playchar_in int `json:"playchar_in"`
	Background_id int `json:"background_id"`
}

type BgProfSkillResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Playchar_in int `json:"playchar_in"`
	Data []models.BackgroundProficiency `json:"background_proficiencies"`
}

func (this *BackgroundsController)  GetSkillProficiency() {
	user := this.GetSession("user")
	if user != nil {
		var bPrSkRe BgProfSkillRequest
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &bPrSkRe)
		resp := BgProfSkillResp{Success: false, Error: "", Playchar_in: bPrSkRe.Playchar_in}
		if err == nil {
			resp.Success = true;
			resp.Data = models.GetSkillProficiencies(bPrSkRe.Background_id)
		} 
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}