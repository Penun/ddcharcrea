package home

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
)

type RaceController struct {
	beego.Controller
}

type SubRaceReq struct {
	RaceId int64 `json:"r_id"`
}

type RaceFeatReq struct {
	R_in int `json:"r_in"`
	RaceId int64 `json:"r_id"`
}

type RaceListResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Data []models.Race `json:"races"`
}

type SubRaceResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	RaceId int64 `json:"r_id"`
	Data []models.SubRace `json:"sub_races"`	
}

type RaceFeatResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	R_in int `json:"r_in"`
	Data []models.RaceFeature `json:"race_features"`	
}

func (this *RaceController) GetRaces() {
	user := this.GetSession("user")
	if user != nil {
		resp := RaceListResp{Success: true, Error: ""}
		resp.Data = models.GetAllRaces()
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func (this *RaceController) GetSubRaces() {
	user := this.GetSession("user")
	if user != nil {
		var sRaceReq SubRaceReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &sRaceReq)
		resp := SubRaceResp{Success: false, Error: ""}
		if err == nil {
			resp.Success = true
			resp.RaceId = sRaceReq.RaceId
			resp.Data = models.GetSubRaces(sRaceReq.RaceId)
		}
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func (this *RaceController) GetRaceFeatures() {
	user := this.GetSession("user")
	if user != nil {
		var rFeatReq RaceFeatReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &rFeatReq)
		resp := RaceFeatResp{Success: false, Error: ""}
		if err == nil {
			resp.Success = true
			resp.R_in = rFeatReq.R_in
			resp.Data = models.GetRaceFeatures(rFeatReq.RaceId)
		}
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}