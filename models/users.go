package models

import (
	"github.com/astaxie/beego/orm"
)

func TryLogin(user *User) bool{
	o := orm.NewOrm()
	if err := o.QueryTable("user").Filter("user_name", user.UserName).Filter("password", user.Password).One(user); err == nil {
		return true;
	} else {
		return false;
	} 
}