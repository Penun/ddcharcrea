package models

import (
	"github.com/astaxie/beego/orm"
)

type User struct {
	User_id int `orm:"pk" json:"user_id"`
	UserName string `json:"userName"`
	Password string `json:"password"`
	Clearance int `json:"clearance"`
}

type Playchar struct {
	Playchar_id int `orm:"pk" json:"playchar_id"`
	Name string `json:"name"`
	Level int `json:"level"`
	HitPoints int `json:"hit_points"`
	Exp int `json:"exp"`
	BStr int `json:"b_str"`
	BDex int `json:"b_dex"`
	BCon int `json:"b_con"`
	BInt int `json:"b_int"`
	BWis int `json:"b_wis"`
	BCha int `json:"b_cha"`
	Sex string `json:"sex"`
	User *User `orm:"rel(fk)" json:"user"`
	RaceBuild *RaceBuild `orm:"rel(one)" json:"race_build"`
	ClassBuild *ClassBuild `orm:"rel(one)" json:"class_build"`
}

type Race struct {
	Race_id int `orm:"pk" json:"race_id"`
	Name string `json:"name"`
}

type SubRace struct {
	SubRace_id int `orm:"pk" json:"sub_race_id"`
	Race *Race `orm:"rel(fk)" json:"race"`
	Name string `json:"name"`
}

type Class struct {
	Class_id int `orm:"pk" json:"class_id"`
	Name string `json:"name"`
	HitDice int `json:"hit_dice"`
	FLevelHpMod string `json:"f_level_hp_mod"`
}

type ClassPath struct {
	ClassPath_id int `orm:"pk" json:"class_path_id"`
	Class *Class `orm:"rel(fk)" json:"class"`
	Name string `json:"name"`
}

type RaceBuild struct {
	RaceBuild_id int `orm:"pk" json:"race_build_id"`
	Race *Race `orm:"rel(fk)" json:"race"`
	SubRace *SubRace `orm:"rel(fk)" json:"sub_race"`
	Playchar *Playchar `orm:"rel(fk)" json:"playchar"`
}

type ClassBuild struct {
	ClassBuild_id int `orm:"pk" json:"class_build_id"`
	Class *Class `orm:"rel(fk)" json:"class"`
	ClassPath *ClassPath `orm:"rel(fk)" json:"class_path"`
	Playchar *Playchar `orm:"rel(fk)" json:"playchar"`
}

func init() {
	orm.RegisterModel(new(User), new(Playchar), new(Race), new(SubRace), new(Class), 
		new(ClassPath), new(RaceBuild), new(ClassBuild))
}