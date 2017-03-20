package chars

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"math/rand"
	"encoding/json"
)

type CharacterController struct {
	beego.Controller
}

type UpdateChosen struct {
	CbChosenProficiency_id int64 `json:"cb_chosen_proficiency_id"`
	ClassProficiency_id int64 `json:"class_proficiency_id"`
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

type UpdateReq struct {
	Playchar models.Playchar `json:"playchar"`
	UpdateChosen []UpdateChosen `json:"update_chosen"`
}

type GenCharReq struct {
	Level int `json:"level"`
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

type DelCharResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Us_in int `json:"u_i"`
	Pl_in int `json:"p_i"`
}

func (this *CharacterController)  GetCharList() {
	user := this.GetSession("user")
	if user != nil {
		var cGetReq CharGetListReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &cGetReq)
		resp := CharGetListResp{Success: false, Error: "", User_id: cGetReq.User_id}
		if err == nil {
			resp.Success = true
			resp.Data = models.GetCharsList_NonNPC(cGetReq.User_id)
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
			if r_obj.Playchar.Playchar_id != 0 {
				r_obj.RaceFeatures = models.GetRaceFeatures(r_obj.Playchar.RaceBuild.Race.Race_id)
				resp.Data = r_obj
			} else {
				resp.Success = false
			}
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
			if resp.Success = InsertPlaychar(&insReq.Playchar, insReq.ChosenProfs); resp.Success {
				resp.Data = insReq.Playchar
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

func (this *CharacterController) Update() {
	user := this.GetSession("user")
	if user != nil {
		var updReq UpdateReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &updReq)
		resp := InsDetResp{Success: false, Error: ""}
		if err == nil {
			suc_up := models.UpdatePlaychar(updReq.Playchar)
			if suc_up >= 0 {
				_ = models.UpdateRaceBuild(*updReq.Playchar.RaceBuild)
				_ = models.UpdateClassBuild(*updReq.Playchar.ClassBuild)
				_ = models.UpdateBackgroundBuild(*updReq.Playchar.BackgroundBuild)
				var cb_chosen models.CbChosenProficiency
				cb_chosen.ClassProficiency = new(models.ClassProficiency)
				cb_chosen.ClassBuild = updReq.Playchar.ClassBuild
				for i := 0; i < len(updReq.UpdateChosen); i++ {
					cb_chosen.CbChosenProficiency_id = updReq.UpdateChosen[i].CbChosenProficiency_id
					cb_chosen.ClassProficiency.ClassProficiency_id = updReq.UpdateChosen[i].ClassProficiency_id

					if cb_chosen.CbChosenProficiency_id != 0 {
						if cb_chosen.ClassProficiency.ClassProficiency_id != 0 {
							_ = models.UpdateCbChosenProficiency(cb_chosen)
						} else {
							_ = models.DeleteCbChosenProficiency(cb_chosen)
						}
					} else {
						_ = models.InsertCbChosenProficiency(cb_chosen)
					}
				}

				resp.Success = true
				resp.Data = updReq.Playchar
			}
		}
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func (this *CharacterController) Delete() {
	user := this.GetSession("user")
	if user != nil {
		var delReq CharGetDetReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &delReq)
		resp := DelCharResp{Success: false, Error: "", Us_in: delReq.Us_in, Pl_in: delReq.Pl_in}
		if err == nil {
			char := models.GetBaseCharWUser(delReq.Playchar_id)
			if char.Playchar_id != 0 {
				if char.User.User_id == user.(models.User).User_id {
					resp.Success = models.DeletePlaychar(delReq.Playchar_id)
				} else {
					resp.Error = "Not permitted."
				}
			} else {
				resp.Error = "No characeter."
			}
		} else {
			resp.Error = "Parse error."
		}
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func (this *CharacterController) GenerateRandom() {
	user := this.GetSession("user")
	if user != nil {
		var genReq GenCharReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &genReq)
		resp := InsDetResp{Success: false, Error: ""}
		if err == nil {
			resp.Data.Level = genReq.Level

			races := models.GetPreRaceList()

			n_rb := new(models.RaceBuild)
			n_rb.Race = new(models.Race)
			randInt := rand.Intn(len(races))
			n_rb.Race.Race_id = races[randInt]["Race_id"].(int64)
			subRaces := models.GetPreSubRaceList(n_rb.Race.Race_id)
			if len(subRaces) > 0 {
				randInt = rand.Intn(len(subRaces))
				n_rb.SubRace = new(models.SubRace)
				n_rb.SubRace.SubRace_id = subRaces[randInt]["SubRace_id"].(int64)
			}

			resp.Data.RaceBuild = n_rb

			resp.Success = true
		} else {
			resp.Error = "parse error"
		}
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func InsertPlaychar(char *models.Playchar, ch_profs []int64) bool {
	n_id := models.InsertPlaychar(*char)
	if n_id > 0 {
		char.Playchar_id = n_id

		p_rb := *char.RaceBuild
		p_rb.Playchar = new(models.Playchar)
		p_rb.Playchar.Playchar_id = n_id

		p_cb := *char.ClassBuild
		p_cb.Playchar = new(models.Playchar)
		p_cb.Playchar.Playchar_id = n_id

		p_bb := *char.BackgroundBuild
		p_bb.Playchar = new(models.Playchar)
		p_bb.Playchar.Playchar_id = n_id

		if n_rb_id := models.InsertRaceBuild(p_rb); n_rb_id > 0 {
			char.RaceBuild.RaceBuild_id = n_rb_id
		}

		if n_cb_id := models.InsertClassBuild(p_cb); n_cb_id > 0 {
			char.ClassBuild.ClassBuild_id = n_cb_id
			for i := 0; i < len(ch_profs); i++ {
				chProf := models.CbChosenProficiency{
					ClassProficiency: new(models.ClassProficiency),
					ClassBuild: new(models.ClassBuild)}
				chProf.ClassProficiency.ClassProficiency_id = ch_profs[i]
				chProf.ClassBuild.ClassBuild_id = n_cb_id
				_ = models.InsertCbChosenProficiency(chProf)
			}
		}

		if n_bb_id := models.InsertBackgroundBuild(p_bb); n_bb_id > 0 {
			char.BackgroundBuild.BackgroundBuild_id = n_bb_id
		}

		if suc_up := models.UpdatePlaychar(*char); suc_up > 0 {
			return true
		}
	}
	return false
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
