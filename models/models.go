package models

import (
	"github.com/astaxie/beego/orm"
)

type User struct {
	User_id int64 `orm:"pk" json:"user_id"`
	UserName string `json:"user_name"`
	Password string `json:"password"`
	Clearance int `json:"clearance"`
}

type Playchar struct {
	Playchar_id int64 `orm:"pk" json:"playchar_id"`
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
	IsPartial bool `json:"is_partial"`
	RaceBuild *RaceBuild `orm:"rel(one);null" json:"race_build"`
	ClassBuild *ClassBuild `orm:"rel(one);null" json:"class_build"`
	BackgroundBuild *BackgroundBuild `orm:"rel(one);null" json:"background_build"`
	IsNpc bool `json:"is_npc"`
}

type Race struct {
	Race_id int64 `orm:"pk" json:"race_id"`
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
	SubRace_id int64 `orm:"pk" json:"sub_race_id"`
	Race *Race `orm:"rel(fk)" json:"race"`
	Name string `json:"name"`
	AbilityMods string `json:"ability_mods"`
}

type Class struct {
	Class_id int64 `orm:"pk" json:"class_id"`
	Name string `json:"name"`
	HitDice int `json:"hit_dice"`
	SkillProfs int `json:"skill_profs"`
	AbilPrefs string `json:"abil_prefs"`
}

type ClassPath struct {
	ClassPath_id int64 `orm:"pk" json:"class_path_id"`
	Class *Class `orm:"rel(fk)" json:"class"`
	Name string `json:"name"`
}

type Proficiency struct {
	Proficiency_id int64 `orm:"pk" json:"proficiency_id"`
	Name string `json:"name"`
	Type string `json:"type"`
	S_code string `json:"s_code"`
}

type ClassProficiency struct {
	ClassProficiency_id int64 `orm:"pk" json:"class_proficiency_id"`
	Proficiency *Proficiency `orm:"rel(fk)" json:"proficiency"`
	Class *Class `orm:"rel(fk)" json:"class"`
}

type CbChosenProficiency struct {
	CbChosenProficiency_id int64 `orm:"pk" json:"cb_chosen_proficiency_id"`
	ClassProficiency *ClassProficiency `orm:"rel(fk)" json:"class_proficiency"`
	ClassBuild *ClassBuild `orm:"rel(fk)" json:"class_build"`
}

type Feature struct {
	Feature_id int64 `orm:"pk" json:"feature_id"`
	Name string `json:"name"`
	Description string `json:"description"`
	Options string `json:"options"`
}

type RaceFeature struct {
	RaceFeature_id int64 `orm:"pk" json:"race_feature_id"`
	Race *Race `orm:"rel(fk)" json:"race"`
	Feature *Feature `orm:"rel(fk)" json:"feature"`
}

type Background struct {
	Background_id int64 `orm:"pk" json:"background_id"`
	Name string `json:"name"`
	Description string `json:"description"`
	Feature *Feature `orm:"rel(fk)" json:"feature"`
	Characteristic string `json:"characteristic"`
}

type BackgroundProficiency struct {
	BackgroundProficiency_id int64 `orm:"pk" json:"background_proficiency_id"`
	Background *Background `orm:"rel(fk)" json:"background"`
	Proficiency *Proficiency `orm:"rel(fk)" json:"proficiency"`
}

type Trait struct {
	Trait_id int64 `orm:"pk" json:"trait_id"`
	Background *Background `orm:"rel(fk)" json:"background"`
	Description string `json:"description"`
}

type Ideal struct {
	Ideal_id int64 `orm:"pk" json:"ideal_id"`
	Background *Background `orm:"rel(fk)" json:"background"`
	Description string `json:"description"`
}

type Bond struct {
	Bond_id int64 `orm:"pk" json:"bond_id"`
	Background *Background `orm:"rel(fk)" json:"background"`
	Description string `json:"description"`
}

type Flaw struct {
	Flaw_id int64 `orm:"pk" json:"flaw_id"`
	Background *Background `orm:"rel(fk)" json:"background"`
	Description string `json:"description"`
}

type RaceBuild struct {
	RaceBuild_id int64 `orm:"pk" json:"race_build_id"`
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
	ClassBuild_id int64 `orm:"pk" json:"class_build_id"`
	Class *Class `orm:"rel(fk)" json:"class"`
	ClassPath *ClassPath `orm:"rel(fk);null" json:"class_path"`
	Playchar *Playchar `orm:"rel(fk)" json:"playchar"`
}

type BackgroundBuild struct {
	BackgroundBuild_id int64 `orm:"pk" json:"background_build_id"`
	Background *Background `orm:"rel(fk)" json:"background"`
	Playchar *Playchar `orm:"rel(fk)" json:"playchar"`
	Trait *Trait `orm:"rel(fk);null" json:"trait"`
	Ideal *Ideal `orm:"rel(fk);null" json:"ideal"`
	Bond *Bond `orm:"rel(fk);null" json:"bond"`
	Flaw *Flaw `orm:"rel(fk);null" json:"flaw"`
}

// Temp monster Table
type Monster struct {
	Monster_id int64 `orm:"pk" json:"monster_id"`
	Name string `json:"name"`
}

// Campaign Related Tables

type Campaign struct {
	Campaign_id int64 `orm:"pk" json:"campaign_id"`
	Owner *User `orm:"rel(fk)" json:"owner"`
	Name string `json:"name"`
	Description string `json:"description"`
}

type Region struct {
	Region_id int64 `orm:"pk" json:"region_id"`
	Campaign *Campaign `orm:"rel(fk)" json:"cmapaign"`
	Name string `json:"name"`
	Description string `json:"description"`
}

type Encounter struct {
	Encounter_id int64 `orm:"pk" json:"encounter_id"`
	Region *Region `orm:"rel(fk)" json:"region"`
	Name string `json:"name"`
	Description string `json:"description"`
}

type EncPlaychar struct {
	EncPlaychar_id int64 `orm:"pk" json:"enc_playchar_id"`
	Encounter *Encounter `orm:"rel(fk)" json:"encounter"`
	Playchar *Playchar `orm:"rel(fk)" json:"playchar"`
}

type EncMonster struct {
	EncMonster_id int64 `orm:"pk" json:"enc_monster_id"`
	Encounter *Encounter `orm:"rel(fk)" json:"encounter"`
	Monster *Monster `orm:"rel(fk)" json:"monster"`
}

type CampSub struct {
	CampSub_id int64 `orm:"pk" json:"camp_sub_id"`
	Playchar *Playchar `orm:"rel(fk)" json:"playchar"`
	Campaign *Campaign `orm:"rel(fk)" json:"campaign"`
}

func init() {
	orm.RegisterModel(new(User), new(Playchar), new(Race), new(SubRace), new(Class),
		new(ClassPath), new(Proficiency), new(ClassProficiency), new(CbChosenProficiency),
		new(Feature), new(RaceFeature), new(Background), new(BackgroundProficiency), new(Trait),
		new(Ideal),	new(Bond), new(Flaw), new(RaceBuild), new(ClassBuild), new(BackgroundBuild),
		new(Campaign), new(Region), new(Encounter), new(EncPlaychar), new(EncMonster),
		new(CampSub), new(Monster))
}
