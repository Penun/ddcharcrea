package models

import (
	"github.com/astaxie/beego/orm"
    "fmt"
)

func GetCampaigns(user_id int64) []Campaign {
    o := orm.NewOrm()
    var campaigns []Campaign
    o.QueryTable("campaign").Filter("owner_id", user_id).All(&campaigns)
    if len(campaigns) > 0 {
        fmt.Println("Heere")
        return campaigns
    } else {
        fmt.Println("Hefdsfsdfere")
        return []Campaign{}
    }
}
