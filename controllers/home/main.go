package home

import (
	"github.com/astaxie/beego"
)

type MainController struct {
	beego.Controller
}

func (this *MainController) Get() {
	user := this.GetSession("user")
	if user != nil {
		this.TplName = "main/main.tpl"
	} else {
		this.Redirect("/", 302)
	}
}
