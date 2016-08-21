package models

import (
	"github.com/astaxie/beego/orm"
)

func GetSkillProficiencies(background_id int) []BackgroundProficiency {
	o := orm.NewOrm()
	var skillProfs []BackgroundProficiency
	o.QueryTable("background_proficiency").RelatedSel("proficiency").Filter("background_id", background_id).Filter("proficiency__type", "skill").All(&skillProfs)
	if len(skillProfs) > 0 {
		return skillProfs
	} else {
		return []BackgroundProficiency{} 
	}
}