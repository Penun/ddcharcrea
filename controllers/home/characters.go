package home

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
)

type CharacterController struct {
	beego.Controller
}

type CharGetListReq struct {
	User_id int `json: "user_id"`
}

type CharGetListResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	User_id int `json:"user_id"`
	Data []models.Playchar `json:"playchars"`
}

func (this *CharacterController)  GetCharList() {
	user := this.GetSession("user")
	if user != nil {
		var cGetReq CharGetListReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &cGetReq)
		resp := CharGetListResp{Success: false, Error: "", User_id: cGetReq.User_id}
		if err == nil {
			resp.Success = true;
			resp.Data = models.GetCharsList_UserId(cGetReq.User_id)
		} 
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}