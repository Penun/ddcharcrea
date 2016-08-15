package routers

import (
	"github.com/Penun/DDCharCrea/controllers"
	"github.com/Penun/DDCharCrea/controllers/home"
	"github.com/Penun/DDCharCrea/controllers/home/characters"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.LoginController{})
    beego.Router("/main", &home.MainController{})
    beego.Router("/characters", &characters.CharacterController{})
}