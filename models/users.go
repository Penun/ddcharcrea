package models

import (
	"github.com/astaxie/beego/orm"
)

func TryLogin(user *User) bool{
	o := orm.NewOrm()
	if err := o.QueryTable("user").Filter("user_name", user.UserName).Filter("password", user.Password).One(user); err == nil {
		return true
	} else {
		return false
	} 
}

func GetUsers(u_clear int) []orm.Params{
	o := orm.NewOrm()
	var users []orm.Params
	num, _ := o.QueryTable("user").Filter("clearance__gte", u_clear).Values(&users, "user_id", "user_name", "clearance")
	if num > 0 {
		return users
	} else {
		return []orm.Params{} 
	}
}