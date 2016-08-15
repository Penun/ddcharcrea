package characters

import (
	"github.com/Penun/DDCharCrea/models"
	"github.com/astaxie/beego"
)

type CharacterController struct {
	beego.Controller
}

func (this *CharacterController) Get() {
	user := this.GetSession("user")
	if user != nil {
		this.Data["name"] = user.(models.Users).UserName
		this.TplName = "main/characters.tpl"
	} else {
		this.Redirect("/", 302)
	}
}

func (this *CharacterController) Post() {
	user := this.GetSession("user")
	if user != nil {
		this.Data["name"] = user.(models.Users).UserName
		this.TplName = "main/characters.tpl"	
	} else {
		this.Redirect("/", 302)
	}
}