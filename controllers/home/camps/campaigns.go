package camps

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
//	"encoding/json"
)

type CampaignController struct {
    beego.Controller
}

type GetCampaignsResp struct {
    Success bool `json:"success"`
	Error string `json:"error"`
	Data []models.Campaign `json:"campaigns"`
}

func (this *CampaignController) GetCampaigns() {
    user := this.GetSession("user")
    if user != nil {
        resp := GetCampaignsResp{Success: true, Error: ""}
        resp.Data = models.GetCampaigns(user.(models.User).User_id)
        this.Data["json"] = resp
        this.ServeJSON()
    } else {
        this.Redirect("/", 302)
    }
}
