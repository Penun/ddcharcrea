package home

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
	"strconv"
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

type CharGetDetReq struct {
	Playchar_id int `json:"playchar_id"`
	Us_in int `json:"u_i"`
	Pl_in int `json:"p_i"`
}

type CharGetDetResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Us_in int `json:"u_i"`
	Pl_in int `json:"p_i"`
	Data models.Playchar `json:"playchar"`
}

type InsDetReq struct {
	Name string `json:"name"`
	Level string `json:"level"`
	HitPoints string `json:"hit_points"`
	Exp string `json:"exp"`
	B_str string `json:"b_str"`
	B_dex string `json:"b_dex"`
	B_con string `json:"b_con"`
	B_int string `json:"b_int"` 
	B_wis string `json:"b_wis"`
	B_cha string `json:"b_cha"`
	Sex string `json:"sex"`
}

type InsDetResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
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

func (this *CharacterController) InsertDetails() {
	user := this.GetSession("user")
	if user != nil {
		var insDetReq InsDetReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &insDetReq)
		resp := CharGetDetResp{Success: false, Error: ""}
		if err == nil {
			var pc models.Playchar
			var perr error
			pc.Name = insDetReq.Name
			pc.Level, perr = strconv.Atoi(insDetReq.Level)
			if perr == nil {
				if pc.Level > 20 {
					pc.Level = 20
				}
			}
			pc.HitPoints, _ = strconv.Atoi(insDetReq.HitPoints)
			pc.Exp, _ = strconv.Atoi(insDetReq.Exp)
			pc.B_str, perr = strconv.Atoi(insDetReq.B_str)
			if perr == nil {
				if pc.B_str > 30 {
					pc.B_str = 30
				}
			}
			pc.B_dex, perr = strconv.Atoi(insDetReq.B_dex)
			if perr == nil {
				if pc.B_dex > 30 {
					pc.B_dex = 30
				}
			}
			pc.B_con, perr = strconv.Atoi(insDetReq.B_con)
			if perr == nil {
				if pc.B_con > 30 {
					pc.B_con = 30
				}
			}
			pc.B_int, perr = strconv.Atoi(insDetReq.B_int)
			if perr == nil {
				if pc.B_int > 30 {
					pc.B_int = 30
				}
			}
			pc.B_wis, perr = strconv.Atoi(insDetReq.B_wis)
			if perr == nil {
				if pc.B_wis > 30 {
					pc.B_wis = 30
				}
			}
			pc.B_cha, perr = strconv.Atoi(insDetReq.B_cha)
			if perr == nil {
				if pc.B_cha > 30 {
					pc.B_cha = 30
				}
			}
			pc.Sex = insDetReq.Sex
			pc.User = new(models.User)
			pc.User.User_id = user.(models.User).User_id
			pc.IsPartial = true
			resp.Success = models.InsertPlaychar(pc)
			if resp.Success {
				resp.Data = pc
			}
		}
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}