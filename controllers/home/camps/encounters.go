package camps

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
)

type EncounterController struct {
    beego.Controller
}

type GetEncsReq struct {
    Region_id int64 `json:"r_id"`
	C_ind int64 `json:"c_ind"`
	R_ind int64 `json:"r_ind"`
}

type GetEncsResp struct {
    Success bool `json:"success"`
	Error string `json:"error"`
	Data []models.Encounter `json:"encounters"`
	C_ind int64 `json:"c_ind"`
	R_ind int64 `json:"r_ind"`
}

func (this *EncounterController) GetEncounters() {
    user := this.GetSession("user")
    if user != nil {
        var encsReq GetEncsReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &encsReq)
        resp := GetEncsResp{Success: false, Error: ""}
        if err == nil {
            resp.Data = models.GetEncounters(encsReq.Region_id)
			resp.C_ind = encsReq.C_ind
			resp.R_ind = encsReq.R_ind
            resp.Success = true;
        }
        this.Data["json"] = resp
        this.ServeJSON()
    } else {
        this.Redirect("/", 302)
    }
}
