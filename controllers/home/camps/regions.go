package camps

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
)

type RegionController struct {
    beego.Controller
}

type GetRegionsReq struct {
    Campaign_id int64 `json:"c_id"`
}

type GetRegionsResp struct {
    Success bool `json:"success"`
	Error string `json:"error"`
    Campaign_id int64 `json:"c_id"`
	Data []models.Region `json:"regions"`
}

func (this *RegionController) GetRegions() {
    user := this.GetSession("user")
    if user != nil {
        var regionsReq GetRegionsReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &regionsReq)
        resp := GetRegionsResp{Success: false, Error: ""}
        if err == nil {
            resp.Data = models.GetRegions(regionsReq.Campaign_id)
            resp.Campaign_id = regionsReq.Campaign_id
            resp.Success = true;
        }
        this.Data["json"] = resp
        this.ServeJSON()
    } else {
        this.Redirect("/", 302)
    }
}
