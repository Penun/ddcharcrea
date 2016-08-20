package routers

import (
	"github.com/Penun/DDCharCrea/controllers"
	"github.com/Penun/DDCharCrea/controllers/home"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.LoginController{})
    beego.Router("/main", &home.MainController{})
    beego.Router("/characters", &home.CharacterController{})
    beego.Router("/classes", &home.ClassesController{}, "get:Index");
    beego.Router("/classes/chosenprof", &home.ClassesController{}, "post:ChosenProficiencies");
    beego.Router("/classes/givenprof", &home.ClassesController{}, "get:GivenProficiencies");
}