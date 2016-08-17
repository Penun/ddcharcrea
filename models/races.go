package models

import (
	"github.com/astaxie/beego/orm"
)

func GetPreRaceList() []orm.Params {
	o := orm.NewOrm()
	var races []orm.Params
	num, _ := o.QueryTable("race").Values(&races, "race_id", "name")
	if num > 0 {
		return races
	} else {
		return []orm.Params{} 
	}
}

func GetPreSubRaceList() []orm.Params {
	o := orm.NewOrm()
	var subRaces []orm.Params
	num, _ := o.QueryTable("sub_race").Values(&subRaces, "sub_race_id", "name")
	if num > 0 {
		return subRaces
	} else {
		return []orm.Params{} 
	}
}