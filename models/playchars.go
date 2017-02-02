package models

import (
	"github.com/astaxie/beego/orm"
)

func GetCharsList_UserId(userId int64) []Playchar {
	o := orm.NewOrm()
	var playchars []Playchar
	o.QueryTable("playchar").Filter("user_id", userId).All(&playchars)
	if len(playchars) > 0 {
		return playchars
	} else {
		return []Playchar{} 
	}
}

func GetCharDetails_PlayCharId(playcharId int64) Playchar {
	o := orm.NewOrm()
	var playchar Playchar
	o.QueryTable("playchar").Filter("playchar_id", playcharId).RelatedSel("raceBuild").RelatedSel("raceBuild__race").RelatedSel("raceBuild__subRace").RelatedSel("classBuild").RelatedSel("classBuild__class").RelatedSel("classBuild__classPath").RelatedSel("backgroundBuild").RelatedSel("backgroundBuild__background").RelatedSel("backgroundBuild__background__feature").RelatedSel("backgroundBuild__trait").RelatedSel("backgroundBuild__ideal").RelatedSel("backgroundBuild__bond").RelatedSel("backgroundBuild__flaw").One(&playchar)
	return playchar
}

func InsertPlaychar(pc Playchar) int64 {
	o := orm.NewOrm()
	id, err := o.Insert(&pc)
	if err == nil {
		return id
	} else {
		return 0
	}
}

func UpdatePlaychar(pc Playchar) int64 {
	o := orm.NewOrm()
	num, err := o.Update(&pc)
	if err == nil {
		return num
	} else {
		return 0
	}
}

func DeletePlaychar(playcharId int64) bool {
	o := orm.NewOrm()
	p_char := Playchar{Playchar_id:playcharId}
	num, err := o.Delete(&p_char)
	if err == nil && num > 0 {
		return true
	} else {
		return false
	}
}

func GetBaseCharWUser(playcharId int64) Playchar {
	o := orm.NewOrm()
	var playchar Playchar
	o.QueryTable("playchar").Filter("playchar_id", playcharId).RelatedSel("user").One(&playchar)
	return playchar
}