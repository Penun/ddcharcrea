package home

import (
	"github.com/Penun/DDCharCrea/models"
	"github.com/astaxie/beego"
//	"encoding/json"
//	"crypto/sha1"
//	"encoding/base64"
//	"io"
)

type MainController struct {
	beego.Controller
}

func (this *MainController) Get() {
	user := this.GetSession("user")
	if user != nil {
		this.Data["name"] = user.(models.Users).UserName
		this.TplName = "main/main.tpl"	
	} else {
		this.Redirect("/", 302)
	}
}