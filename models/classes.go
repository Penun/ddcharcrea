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

func GetClassPathList(classId int64) []ClassPath {
	o := orm.NewOrm()
	var classPaths []ClassPath
	o.QueryTable("class_path").Filter("class__class_id", classId).All(&classPaths)
	if len(classPaths) > 0 {
		return classPaths
	} else {
		return []ClassPath{} 
	}
}

func InsertClassBuild(c_bd ClassBuild) int64 {
	o := orm.NewOrm()
	id, err := o.Insert(&c_bd)
	if err == nil {
		return id
	} else {
		return 0
	}
}