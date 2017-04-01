package chars

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"math/rand"
	"time"
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

type AbilPrefs struct {
	Abils []AbilityPref `json:"abil_prefs"`
}

type AbilityPref struct {
	Attribute string `json:"att"`
	Rank int `json:"rank"`
}

type AbilityMods struct {
	Mods []AbilityMod `json:"abil_mods"`
}

type AbilityMod struct {
	Mod string `json:"mod"`
	ModVal int `json:"mod_val"`
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
		rand.Seed(time.Now().UTC().UnixNano())
		var genReq GenCharReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &genReq)
		resp := InsDetResp{Success: false, Error: ""}
		if err == nil {
			var randInt int
			resp.Data.Level = genReq.Level
			resp.Data.IsNpc = true
			resp.Data.User = new(models.User)
			resp.Data.User.User_id = user.(models.User).User_id
			if sex := rand.Intn(2); sex > 0 {
				resp.Data.Sex = "m"
			} else {
				resp.Data.Sex = "f"
			}

			races := models.GetAllRaces()
			var subRaces []models.SubRace
			raceInt := -1
			sRaceInt := -1
			n_rb := new(models.RaceBuild)
			if splLen := len(races); splLen > 0 {
				raceInt = rand.Intn(splLen)
				n_rb.Race = new(models.Race)
				n_rb.Race.Race_id = races[raceInt].Race_id

				scaleDif := races[raceInt].MaxHeightIn - races[raceInt].MinHeightIn + 1
				scaleDif = rand.Intn(scaleDif) + races[raceInt].MinHeightIn
				n_rb.HeightIn = scaleDif

				scaleDif = races[raceInt].MaxWeight - races[raceInt].MinWeight + 1
				scaleDif = rand.Intn(scaleDif) + races[raceInt].MinWeight
				n_rb.Weight = scaleDif

				scaleDif = races[raceInt].MaxAge - races[raceInt].AdultAge + 1
				scaleDif = rand.Intn(scaleDif) + races[raceInt].AdultAge
				n_rb.Age = scaleDif

				subRaces = models.GetSubRaces(n_rb.Race.Race_id)
				if splLen = len(subRaces); splLen > 0 {
					sRaceInt = rand.Intn(splLen)
					n_rb.SubRace = new(models.SubRace)
					n_rb.SubRace.SubRace_id = subRaces[sRaceInt].SubRace_id
				}
			}
			resp.Data.RaceBuild = n_rb

			classes := models.GetClassList()
			var classInt int
			n_cb := new(models.ClassBuild)
			abil_prefs := new(AbilPrefs)
			if splLen := len(classes); splLen > 0 {
				classInt = rand.Intn(splLen)
				n_cb.Class = new(models.Class)
				n_cb.Class.Class_id = classes[classInt].Class_id
				ap_bytes := []byte(classes[classInt].AbilPrefs)
				json.Unmarshal(ap_bytes, &abil_prefs)
				if resp.Data.Level >= 3 {
					classPaths := models.GetPreClassPathList(n_cb.Class.Class_id)
					if splLen = len(classPaths); splLen > 0 {
						randInt = rand.Intn(splLen)
						n_cb.ClassPath = new(models.ClassPath)
						n_cb.ClassPath.ClassPath_id = classPaths[randInt]["ClassPath_id"].(int64)
					}
				}
			}
			resp.Data.ClassBuild = n_cb

			abils := make([]int, 6)
			for i := 0; i < 6; i++ {
				abils[i] = GetAbilityScore()
				abils = SortDown(abils, i)
			}

			if splLen := len(abil_prefs.Abils); splLen > 0 {
				var i int
				for i = 0; i < splLen; i++ {
					switch abil_prefs.Abils[i].Attribute {
						case "str":
							resp.Data.B_str = abils[abil_prefs.Abils[i].Rank - 1]
						case "dex":
							resp.Data.B_dex = abils[abil_prefs.Abils[i].Rank - 1]
						case "con":
							resp.Data.B_con = abils[abil_prefs.Abils[i].Rank - 1]
						case "int":
							resp.Data.B_int = abils[abil_prefs.Abils[i].Rank - 1]
						case "wis":
							resp.Data.B_wis = abils[abil_prefs.Abils[i].Rank - 1]
						case "cha":
							resp.Data.B_cha = abils[abil_prefs.Abils[i].Rank - 1]
					}
				}

				abils = abils[i:]

				for len(abils) > 0 {
					randInt = rand.Intn(len(abils))
					if resp.Data.B_str == 0 {
						resp.Data.B_str = abils[randInt]
					} else if resp.Data.B_dex == 0 {
						resp.Data.B_dex = abils[randInt]
					} else if resp.Data.B_con == 0 {
						resp.Data.B_con = abils[randInt]
					} else if resp.Data.B_int == 0 {
						resp.Data.B_int = abils[randInt]
					} else if resp.Data.B_wis == 0 {
						resp.Data.B_wis = abils[randInt]
					} else {
						resp.Data.B_cha = abils[randInt]
					}
					abils = append(abils[:randInt], abils[randInt + 1:]...)
				}
			} else {
				resp.Data.B_str = abils[0]
				resp.Data.B_dex = abils[1]
				resp.Data.B_con = abils[2]
				resp.Data.B_int = abils[3]
				resp.Data.B_wis = abils[4]
				resp.Data.B_cha = abils[5]
			}

			addCon := resp.Data.B_con

			r_mods := new(AbilityMods)
			mods_st := []byte(races[raceInt].AbilityMods)
			json.Unmarshal(mods_st, &r_mods)

			for i := 0; i < len(r_mods.Mods); i++ {
				if r_mods.Mods[i].Mod == "con" {
					addCon += r_mods.Mods[i].ModVal
					break
				}
			}

			if sRaceInt > -1 {
				sr_mods := new(AbilityMods)
				mods_st = []byte(subRaces[sRaceInt].AbilityMods)
				json.Unmarshal(mods_st, &sr_mods)
				for i := 0; i < len(sr_mods.Mods); i++ {
					if sr_mods.Mods[i].Mod == "con" {
						addCon += sr_mods.Mods[i].ModVal
						break
					}
				}
			}

			if addCon < 10 {
				addCon = (addCon - 11) / 2
			} else {
				addCon = (addCon - 10) / 2
			}

			totalHP := classes[classInt].HitDice + addCon

			if genReq.Level > 1 {
				for i := 1; i < genReq.Level; i++ {
					totalHP += rand.Intn(classes[classInt].HitDice) + 1 + addCon
				}
			}

			resp.Data.HitPoints = totalHP

			switch genReq.Level {
				case 2:
					resp.Data.Exp = 300
				case 3:
					resp.Data.Exp = 900
				case 4:
					resp.Data.Exp = 2700
				case 5:
					resp.Data.Exp = 6500
				case 6:
					resp.Data.Exp = 14000
				case 7:
					resp.Data.Exp = 23000
				case 8:
					resp.Data.Exp = 34000
				case 9:
					resp.Data.Exp = 48000
				case 10:
					resp.Data.Exp = 64000
				case 11:
					resp.Data.Exp = 85000
				case 12:
					resp.Data.Exp = 100000
				case 13:
					resp.Data.Exp = 120000
				case 14:
					resp.Data.Exp = 140000
				case 15:
					resp.Data.Exp = 165000
				case 16:
					resp.Data.Exp = 195000
				case 17:
					resp.Data.Exp = 225000
				case 18:
					resp.Data.Exp = 265000
				case 19:
					resp.Data.Exp = 305000
				case 20:
					resp.Data.Exp = 355000
			}

			backs := models.GetPreBackgroundList()
			n_bb := new(models.BackgroundBuild)
			if splLen := len(backs); splLen > 0 {
				randInt = rand.Intn(splLen)
				n_bb.Background = new(models.Background)
				n_bb.Background.Background_id = backs[randInt]["Background_id"].(int64)
			}
			resp.Data.BackgroundBuild = n_bb

//			class_profs := models.GetClassProficiencies(classes[classInt].Class_id)

//			ch_profs := make([]int, 0)
//			for len(ch_profs) < classes[classInt].SkillProfs {
//				randInt = rand.Intn(len)
//			}

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

func GetAbilityScore() int {
	temp_scores := make([]int, 4)
	for i := 0; i < 4; i++ {
		randInt := rand.Intn(6) + 1
		temp_scores[i] = randInt
		temp_scores = SortDown(temp_scores, i)
	}

	var abil_total int
	abil_total = 0

	for i := 0; i < 3; i++ {
		abil_total += temp_scores[i]
	}

	return abil_total
}

func SortDown(list []int, st_ind int) []int {
	if st_ind - 1 >= 0 && list[st_ind - 1] < list[st_ind] {
		temp := list[st_ind - 1]
		list[st_ind - 1] = list[st_ind]
		list[st_ind] = temp
		list = SortDown(list, st_ind - 1)
	}
	return list
}
