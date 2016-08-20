package models

import (
	"github.com/astaxie/beego/orm"
)

func GetClassList() []Class {
	o := orm.NewOrm()
	var classes []Class
	o.QueryTable("class").All(&classes)
	if len(classes) > 0 {
		return classes
	} else {
		return []Class{} 
	}
}

func GetClassPathList() []ClassPath {
	o := orm.NewOrm()
	var classPaths []ClassPath
	o.QueryTable("class_path").All(&classPaths)
	if len(classPaths) > 0 {
		return classPaths
	} else {
		return []ClassPath{} 
	}
}

func GetCbChosenProficiencies(classBuild_id int) []CbChosenProficiency {
	o := orm.NewOrm()
	var chosProfs []CbChosenProficiency
	o.QueryTable("cb_chosen_proficiency").Filter("class_build_id", classBuild_id).RelatedSel("classProficiency").RelatedSel("classProficiency__proficiency").All(&chosProfs)
	if len(chosProfs) > 0 {
		return chosProfs
	} else {
		return []CbChosenProficiency{} 
	}
}