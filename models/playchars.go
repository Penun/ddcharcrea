package models

import (
	"github.com/astaxie/beego/orm"
)

func GetChars_UserId(userId int) []Playchar {
	o := orm.NewOrm()
	var playchars []Playchar
	o.QueryTable("playchar").Filter("user_id", userId).RelatedSel("raceBuild").RelatedSel("classBuild").All(&playchars)
	if len(playchars) > 0 {
		return playchars
	} else {
		return []Playchar{} 
	}
}