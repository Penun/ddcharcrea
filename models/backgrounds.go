package models

import (
	"github.com/astaxie/beego/orm"
)

func GetPreBackgroundList() []orm.Params {
	o := orm.NewOrm()
	var backgrounds []orm.Params
	num, _ := o.QueryTable("background").Values(&backgrounds, "background_id", "name")
	if num > 0 {
		return backgrounds
	} else {
		return []orm.Params{}
	}
}

func GetBackgroundList() []Background {
	o := orm.NewOrm()
	var backgrounds []Background
	o.QueryTable("background").RelatedSel("feature").All(&backgrounds)
	if len(backgrounds) > 0 {
		return backgrounds
	} else {
		return []Background{}
	}
}

func InsertBackgroundBuild(b_bd BackgroundBuild) int64 {
	o := orm.NewOrm()
	id, err := o.Insert(&b_bd)
	if err == nil {
		return id
	} else {
		return 0
	}
}

func UpdateBackgroundBuild(b_bd BackgroundBuild) int64 {
	o := orm.NewOrm()
	num, err := o.Update(&b_bd)
	if err == nil {
		return num
	} else {
		return -1
	}
}
