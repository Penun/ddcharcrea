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

func GetClassProficiencies(class_id int64) []ClassProficiency {
	o := orm.NewOrm()
	var classProfs []ClassProficiency
	o.QueryTable("class_proficiency").Filter("class_id", class_id).RelatedSel("proficiency").All(&classProfs)
	if len(classProfs) > 0 {
		return classProfs
	} else {
		return []ClassProficiency{}	
	}
}

func InsertCbChosenProficiency(cbChosen CbChosenProficiency) int64 {
	o := orm.NewOrm()
	id, err := o.Insert(&cbChosen)
	if err == nil {
		return id
	} else {
		return 0
	}
}

func UpdateCbChosenProficiency(cbChosen CbChosenProficiency) int64 {
	o := orm.NewOrm()
	num, err := o.Update(&cbChosen)
	if err == nil {
		return num
	} else {
		return -1
	}
}

func DeleteCbChosenProficiency(cbChosen CbChosenProficiency) bool {
	o := orm.NewOrm()
	num, err := o.Delete(&cbChosen)
	if err == nil && num > 0 {
		return true
	} else {
		return false
	}
}