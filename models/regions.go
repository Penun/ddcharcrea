package models

import (
	"github.com/astaxie/beego/orm"
)

func GetRegions(campaign_id int64) []Region {
    o := orm.NewOrm()
    var regions []Region
    o.QueryTable("region").Filter("campaign_id", campaign_id).All(&regions)
    if len(regions) > 0 {
        return regions
    } else {
        return []Region{}
    }
}
