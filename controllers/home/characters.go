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

type CharGetDetReq struct {
	Playchar_id int `json:"playchar_id"`
	Us_in int `json:"u_i"`
	Pl_in int `json:"p_i"`
}

type CharGetListResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	User_id int `json:"user_id"`
	Data []models.Playchar `json:"playchars"`
}

type CharGetDetResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Us_in int `json:"u_i"`
	Pl_in int `json:"p_i"`
	Data models.Playchar `json:"playchar"`
}

func (this *CharacterController)  GetCharList() {
	user := this.GetSession("user")
	if user != nil {
		var cGetReq CharGetListReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &cGetReq)
		resp := CharGetListResp{Success: false, Error: "", User_id: cGetReq.User_id}
		if err == nil {
			resp.Success = true
			resp.Data = models.GetCharsList_UserId(cGetReq.User_id)
		} 
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func (this *CharacterController)  GetCharDetails() {
	user := this.GetSession("user")
	if user != nil {
		var cGetReq CharGetDetReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &cGetReq)
		resp := CharGetDetResp{Success: false, Error: "", Us_in: cGetReq.Us_in, Pl_in: cGetReq.Pl_in}
		if err == nil {
			resp.Success = true
			resp.Data = models.GetCharDetails_PlayCharId(cGetReq.Playchar_id)
		} 
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}