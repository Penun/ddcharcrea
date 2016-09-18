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

func GetAllRaces() []Race {
	o := orm.NewOrm()
	var races []Race
	o.QueryTable("race").All(&races)
	if len(races) > 0 {
		return races
	} else {
		return []Race{} 
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

func GetSubRaces(r_id int64) []SubRace {
	o := orm.NewOrm()
	var subRaces []SubRace
	o.QueryTable("sub_race").Filter("race__race_id", r_id).All(&subRaces)
	if len(subRaces) > 0 {
		return subRaces
	} else {
		return []SubRace{} 
	}
}

func InsertRaceBuild(r_bd RaceBuild) int64 {
	o := orm.NewOrm()
	id, err := o.Insert(&r_bd)
	if err == nil {
		return id
	} else {
		return 0
	}
}

func GetRaceFeatures(r_id int64) []RaceFeature {
	o := orm.NewOrm()
	var rFeats []RaceFeature
	o.QueryTable("race_feature").RelatedSel("feature").Filter("race_id", r_id).All(&rFeats)
	if len(rFeats) > 0 {
		return rFeats
	} else {
		return []RaceFeature{}			
	}
}