package models

import (
	"github.com/astaxie/beego/orm"
)

func TryLogin(user *Users) bool{
	o := orm.NewOrm()
	if err := o.QueryTable("users").Filter("user_name", user.UserName).Filter("password", user.Password).One(user); err == nil {
		return true;
	} else {
		return false;
	} 
}