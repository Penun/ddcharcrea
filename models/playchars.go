package models

import (
	"github.com/astaxie/beego/orm"
)

func GetChars_UserId(userId int) []PlayChars {
	o := orm.NewOrm()
	var playchars []PlayChars
	o.QueryTable("playchars").Filter("user_id", userID).All(&playchars)
	if len(playchars) > 0 {
		return playchars
	} else {
		return []PlayChars{} 
	}
}