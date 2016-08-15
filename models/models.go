package models

import (
	"github.com/astaxie/beego/orm"
)

type Users struct {
	User_id int `orm:"pk" json:"manager_id"`
	UserName string `json:"userName"`
	Password string `json:"password"`
	Clearance int `json:"clearance"`
}

type PlayChars struct {
	Ch_id int `orm:"pk" json:"ch_id"`
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
}

func init() {
	orm.RegisterModel(new(Users), new(PlayChars))
}