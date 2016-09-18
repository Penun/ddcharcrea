package home

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
	"fmt"
)

type CharacterController struct {
	beego.Controller
}

type CharGetListReq struct {
	User_id int64 `json: "user_id"`
}

type CharGetListResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	User_id int64 `json:"user_id"`
	Data []models.Playchar `json:"playchars"`
}

type CharGetDetReq struct {
	Playchar_id int64 `json:"playchar_id"`
	Us_in int `json:"u_i"`
	Pl_in int `json:"p_i"`
}

type CharGetDetResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Us_in int `json:"u_i"`
	Pl_in int `json:"p_i"`
	Data DetDataRespObj `json:"resp_obj"`
}

type DetDataRespObj struct {
	Playchar models.Playchar `json:"playchar"`
	RaceFeatures []models.RaceFeature `json:"race_features"`
}

type InsertReq struct {
	Playchar models.Playchar `json:"playchar"`
	ChosenProfs []int64 `json:"chosen_profs"`
}

//type InsDetReq struct {
//	Name string `json:"name"`
//	Level string `json:"level"`
//	HitPoints string `json:"hit_points"`
//	Exp string `json:"exp"`
//	B_str string `json:"b_str"`
//	B_dex string `json:"b_dex"`
//	B_con string `json:"b_con"`
//	B_int string `json:"b_int"` 
//	B_wis string `json:"b_wis"`
//	B_cha string `json:"b_cha"`
//	Sex string `json:"sex"`
//}

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
			var r_obj DetDataRespObj;
			r_obj.Playchar = models.GetCharDetails_PlayCharId(cGetReq.Playchar_id)
			r_obj.RaceFeatures = models.GetRaceFeatures(r_obj.Playchar.RaceBuild.Race.Race_id)
			resp.Data = r_obj
		} 
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func (this *CharacterController) Insert() {
	user := this.GetSession("user")
	if user != nil {
		var insReq InsertReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &insReq)
		resp := InsDetResp{Success: false, Error: ""}
		if err == nil {
			insReq.Playchar.User = new(models.User)
			insReq.Playchar.User.User_id = user.(models.User).User_id
			n_id := models.InsertPlaychar(insReq.Playchar)
			if n_id > 0 {
				insReq.Playchar.Playchar_id = n_id

				p_rb := *insReq.Playchar.RaceBuild
				p_rb.Playchar = new(models.Playchar)
				p_rb.Playchar.Playchar_id = n_id

				p_cb := *insReq.Playchar.ClassBuild
				p_cb.Playchar = new(models.Playchar)
				p_cb.Playchar.Playchar_id = n_id

				p_bb := *insReq.Playchar.BackgroundBuild
				p_bb.Playchar = new(models.Playchar)
				p_bb.Playchar.Playchar_id = n_id

				fmt.Printf("%+v\n", p_bb.Background)

				if n_rb_id := models.InsertRaceBuild(p_rb); n_rb_id > 0 {
					insReq.Playchar.RaceBuild.RaceBuild_id = n_rb_id
				}

				if n_cb_id := models.InsertClassBuild(p_cb); n_cb_id > 0 {
					insReq.Playchar.ClassBuild.ClassBuild_id = n_cb_id
					for i := 0; i < len(insReq.ChosenProfs); i++ {
						chProf := models.CbChosenProficiency{
							ClassProficiency: new(models.ClassProficiency),
							ClassBuild: new(models.ClassBuild)}
						chProf.ClassProficiency.ClassProficiency_id = insReq.ChosenProfs[i]
						chProf.ClassBuild.ClassBuild_id = n_cb_id
						_ = models.InsertCbChosenProficiency(chProf) 
					} 
				}

				if n_bb_id := models.InsertBackgroundBuild(p_bb); n_bb_id > 0 {
					insReq.Playchar.BackgroundBuild.BackgroundBuild_id = n_bb_id
				}

				if suc_up := models.UpdatePlaychar(insReq.Playchar); suc_up > 0 {
					resp.Success = true
					resp.Data = insReq.Playchar
				}
			}
		} else {
			resp.Error = err.Error()
		}
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

//func (this *CharacterController) InsertDetails() {
//	user := this.GetSession("user")
//	if user != nil {
//		var insDetReq InsDetReq
//		err := json.Unmarshal(this.Ctx.Input.RequestBody, &insDetReq)
//		resp := CharGetDetResp{Success: false, Error: ""}
//		if err == nil {
//			var pc models.Playchar
//			var perr error
//			pc.Name = insDetReq.Name
//			pc.Level, perr = strconv.Atoi(insDetReq.Level)
//			if perr == nil {
//				if pc.Level > 20 {
//					pc.Level = 20
//				}
//			}
//			pc.HitPoints, _ = strconv.Atoi(insDetReq.HitPoints)
//			pc.Exp, _ = strconv.Atoi(insDetReq.Exp)
//			pc.B_str, perr = strconv.Atoi(insDetReq.B_str)
//			if perr == nil {
//				if pc.B_str > 30 {
//					pc.B_str = 30
//				}
//			}
//			pc.B_dex, perr = strconv.Atoi(insDetReq.B_dex)
//			if perr == nil {
//				if pc.B_dex > 30 {
//					pc.B_dex = 30
//				}
//			}
//			pc.B_con, perr = strconv.Atoi(insDetReq.B_con)
//			if perr == nil {
//				if pc.B_con > 30 {
//					pc.B_con = 30
//				}
//			}
//			pc.B_int, perr = strconv.Atoi(insDetReq.B_int)
//			if perr == nil {
//				if pc.B_int > 30 {
//					pc.B_int = 30
//				}
//			}
//			pc.B_wis, perr = strconv.Atoi(insDetReq.B_wis)
//			if perr == nil {
//				if pc.B_wis > 30 {
//					pc.B_wis = 30
//				}
//			}
//			pc.B_cha, perr = strconv.Atoi(insDetReq.B_cha)
//			if perr == nil {
//				if pc.B_cha > 30 {
//					pc.B_cha = 30
//				}
//			}
//			pc.Sex = insDetReq.Sex
//			pc.User = new(models.User)
//			pc.User.User_id = user.(models.User).User_id
//			pc.IsPartial = true
//			resp.Success = models.InsertPlaychar(pc)
//			if resp.Success {
//				resp.Data = pc
//			}
//		}
//		this.Data["json"] = resp
//		this.ServeJSON()
//	} else {
//		this.Redirect("/", 302)
//	}
//}