package models

import (
	"github.com/astaxie/beego/orm"
)

type User struct {
	User_id int `orm:"pk" json:"user_id"`
	UserName string `json:"user_name"`
	Password string `json:"password"`
	Clearance int `json:"clearance"`
}

type Playchar struct {
	Playchar_id int `orm:"pk" json:"playchar_id"`
	Name string `json:"name"`
	Level int `json:"level"`
	HitPoints int `json:"hit_points"`
	Exp int `json:"exp"`
	B_str int `json:"b_str"`
	B_dex int `json:"b_dex"`
	B_con int `json:"b_con"`
	B_int int `json:"b_int"`
	B_wis int `json:"b_wis"`
	B_cha int `json:"b_cha"`
	Sex string `json:"sex"`
	User *User `orm:"rel(fk)" json:"user"`
	RaceBuild *RaceBuild `orm:"rel(one)" json:"race_build"`
	ClassBuild *ClassBuild `orm:"rel(one)" json:"class_build"`
	BackgroundBuild *BackgroundBuild `orm:"rel(one)" json:"background_build"`
}

type Race struct {
	Race_id int `orm:"pk" json:"race_id"`
	Name string `json:"name"`
	Speed int `json:"speed"`
	MaxAge int `json:"max_age"`
	AdultAge int `json:"adult_age"`
	MinHeightIn int `json:"min_height_in"` 
	MaxHeightIn int `json:"max_height_in"`
	MinWeight int `json:"min_weight"`
	MaxWeight int `json:"max_weight"`	
	Size string `json:"size"`
	AbilityMods string `json:"ability_mods"`
}

type SubRace struct {
	SubRace_id int `orm:"pk" json:"sub_race_id"`
	Race *Race `orm:"rel(fk)" json:"race"`
	Name string `json:"name"`
	AbilityMods string `json:"ability_mods"`
}

type Class struct {
	Class_id int `orm:"pk" json:"class_id"`
	Name string `json:"name"`
	HitDice int `json:"hit_dice"`
	F_LevelHpMod string `json:"f_level_hp_mod"`
}

type ClassPath struct {
	ClassPath_id int `orm:"pk" json:"class_path_id"`
	Class *Class `orm:"rel(fk)" json:"class"`
	Name string `json:"name"`
}

type Proficiency struct {
	Proficiency_id int `orm:"pk" json:"proficiency_id"`
	Name string `json:"name"`
	Type string `json:"type"`
	S_Code string `json:"s_code"`
}

type ClassProficiency struct {
	ClassProficiency_id int `orm:"pk" json:"class_proficiency_id"`
	Proficiency *Proficiency `orm:"rel(fk)" json:"proficiency"`
	Class *Class `orm:"rel(fk)" json:"class"`
}

type CbChosenProficiency struct {
	CbChosenProficiency_id int `orm:"pk" json:"cb_chosen_proficiency_id"`
	ClassProficiency *ClassProficiency `orm:"rel(fk)" json:"class_proficiency"`
	ClassBuild *ClassBuild `orm:"rel(fk)" json:"class_build"`
}

type Feature struct {
	Feature_id int `orm:"pk" json:"feature_id"`
	Name string `json:"name"`
	Description string `json:"description"`
}

type Background struct {
	Background_id int `orm:"pk" json:"background_id"`
	Name string `json:"name"`
	Description string `json:"description"`
	Feature *Feature `orm:"rel(fk)" json:"feature"`
	Characteristic string `json:"characteristic"`
}

type BackgroundProficiency struct {
	BackgroundProficiency_id int `orm:"pk" json:"background_proficiency_id"`
	Background *Background `orm:"rel(fk)" json:"background"`
	Proficiency *Proficiency `orm:"rel(fk)" json:"proficiency"`
}

type Trait struct {
	Trait_id int `orm:"pk" json:"trait_id"`
	Background *Background `orm:"rel(fk)" json:"background"`
	Description string `json:"description"`
}

type Ideal struct {
	Ideal_id int `orm:"pk" json:"ideal_id"`
	Background *Background `orm:"rel(fk)" json:"background"`
	Description string `json:"description"`
}

type Bond struct {
	Bond_id int `orm:"pk" json:"bond_id"`
	Background *Background `orm:"rel(fk)" json:"background"`
	Description string `json:"description"`
}

type Flaw struct {
	Flaw_id int `orm:"pk" json:"flaw_id"`
	Background *Background `orm:"rel(fk)" json:"background"`
	Description string `json:"description"`
}

type RaceBuild struct {
	RaceBuild_id int `orm:"pk" json:"race_build_id"`
	Race *Race `orm:"rel(fk)" json:"race"`
	SubRace *SubRace `orm:"rel(fk);null" json:"sub_race"`
	Playchar *Playchar `orm:"rel(fk)" json:"playchar"`
	Alignment string `json:"alignment"`
	HeightIn int `json:"height_in"`
	Weight int `json:"weight"`
	Age int `json:"age"`
	Options string `json:"options"`
}

type ClassBuild struct {
	ClassBuild_id int `orm:"pk" json:"class_build_id"`
	Class *Class `orm:"rel(fk)" json:"class"`
	ClassPath *ClassPath `orm:"rel(fk)" json:"class_path"`
	Playchar *Playchar `orm:"rel(fk)" json:"playchar"`
}

type BackgroundBuild struct {
	BackgroundBuild_id int `orm:"pk" json:"background_build_id"`
	Background *Background `orm:"rel(fk)" json:"background"`
	Playchar *Playchar `orm:"rel(fk)" json:"playchar"`
	Trait *Trait `orm:"rel(fk)" json:"trait"`
	Ideal *Ideal `orm:"rel(fk)" json:"ideal"`
	Bond *Bond `orm:"rel(fk)" json:"bond"`
	Flaw *Flaw `orm:"rel(fk)" json:"flaw"`
}

func init() {
	orm.RegisterModel(new(User), new(Playchar), new(Race), new(SubRace), new(Class), 
		new(ClassPath), new(Proficiency), new(ClassProficiency), new(CbChosenProficiency), 
		new(Feature), new(Background), new(BackgroundProficiency), new(Trait), new(Ideal),
		new(Bond), new(Flaw), new(RaceBuild), new(ClassBuild), new(BackgroundBuild))
}