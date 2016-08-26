package models

import (
	"github.com/astaxie/beego/orm"
)

func GetCharsList_UserId(userId int) []Playchar {
	o := orm.NewOrm()
	var playchars []Playchar
	o.QueryTable("playchar").Filter("user_id", userId).All(&playchars)
	if len(playchars) > 0 {
		return playchars
	} else {
		return []Playchar{} 
	}
}

func GetCharDetails_PlayCharId(playcharId int) Playchar {
	o := orm.NewOrm()
	var playchar Playchar
	o.QueryTable("playchar").Filter("playchar_id", playcharId).RelatedSel("raceBuild").RelatedSel("raceBuild__race").RelatedSel("raceBuild__subRace").RelatedSel("classBuild").RelatedSel("classBuild__class").RelatedSel("classBuild__classPath").RelatedSel("backgroundBuild").RelatedSel("backgroundBuild__background").RelatedSel("backgroundBuild__background__feature").RelatedSel("backgroundBuild__trait").RelatedSel("backgroundBuild__ideal").RelatedSel("backgroundBuild__bond").RelatedSel("backgroundBuild__flaw").One(&playchar)
	return playchar
}