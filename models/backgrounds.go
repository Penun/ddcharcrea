package models

import (
	"github.com/astaxie/beego/orm"
)

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

func GetSkillProficiencies(background_id int64) []BackgroundProficiency {
	o := orm.NewOrm()
	var skillProfs []BackgroundProficiency
	o.QueryTable("background_proficiency").RelatedSel("proficiency").Filter("background_id", background_id).Filter("proficiency__type", "skill").All(&skillProfs)
	if len(skillProfs) > 0 {
		return skillProfs
	} else {
		return []BackgroundProficiency{} 
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