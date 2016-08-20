package models

import (
	"github.com/astaxie/beego/orm"
)

func GetChars_UserId(userId int) []Playchar {
	o := orm.NewOrm()
	var playchars []Playchar
	o.QueryTable("playchar").Filter("user_id", userId).RelatedSel("raceBuild").RelatedSel("raceBuild__race").RelatedSel("raceBuild__subRace").RelatedSel("classBuild").RelatedSel("classBuild__class").RelatedSel("classBuild__classPath").RelatedSel("backgroundBuild").RelatedSel("backgroundBuild__background").RelatedSel("backgroundBuild__background__feature").RelatedSel("backgroundBuild__trait").RelatedSel("backgroundBuild__ideal").RelatedSel("backgroundBuild__bond").RelatedSel("backgroundBuild__flaw").All(&playchars)
	if len(playchars) > 0 {
		return playchars
	} else {
		return []Playchar{} 
	}
}