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
		races := models.GetPreRaceList()
		subRaces := models.GetPreSubRaceList()
		classes := models.GetClassList()
		classPaths := models.GetClassPathList()
		this.Data["races"] = races
		this.Data["subRaces"] = subRaces
		this.Data["classes"] = classes
		this.Data["classPaths"] = classPaths
		this.TplName = "main/main.tpl"
	} else {
		this.Redirect("/", 302)
	}
}