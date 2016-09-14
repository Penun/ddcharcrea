package models

import (
	"github.com/astaxie/beego/orm"
)

func GetBackgroundProficiencies(background_id int64) []BackgroundProficiency {
	o := orm.NewOrm()
	var skillProfs []BackgroundProficiency
	o.QueryTable("background_proficiency").RelatedSel("proficiency").Filter("background_id", background_id).Filter("proficiency__type", "skill").All(&skillProfs)
	if len(skillProfs) > 0 {
		return skillProfs
	} else {
		return []BackgroundProficiency{} 
	}
}

func GetCbChosenProficiencies(classBuild_id int64) []CbChosenProficiency {
	o := orm.NewOrm()
	var chosProfs []CbChosenProficiency
	o.QueryTable("cb_chosen_proficiency").Filter("class_build_id", classBuild_id).RelatedSel("classProficiency").RelatedSel("classProficiency__proficiency").All(&chosProfs)
	if len(chosProfs) > 0 {
		return chosProfs
	} else {
		return []CbChosenProficiency{} 
	}
}

func GetSkillProficiencies() []Proficiency {
	o := orm.NewOrm()
	var skProfs []Proficiency
	o.QueryTable("proficiency").Filter("type", "skill").All(&skProfs)
	if len(skProfs) > 0 {
		return skProfs
	} else {
		return []Proficiency{} 
	}
}