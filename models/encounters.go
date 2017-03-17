package models

import (
	"github.com/astaxie/beego/orm"
)

func GetEncounters(region_id int64) []Encounter {
    o := orm.NewOrm()
    var encs []Encounter
    o.QueryTable("encounter").Filter("region_id", region_id).All(&encs)
    if len(encs) > 0 {
        return encs
    } else {
        return []Encounter{}
    }
}
