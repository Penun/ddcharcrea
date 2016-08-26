package routers

import (
	"github.com/Penun/ddcharcrea/controllers"
	"github.com/Penun/ddcharcrea/controllers/home"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.LoginController{})
    beego.Router("/main", &home.MainController{})
    beego.Router("/characters", &home.CharacterController{}, "post:GetCharList")
    beego.Router("/users", &home.UsersController{})
    beego.Router("/classes/chosenprof", &home.ClassesController{}, "post:ChosenProficiencies")
    beego.Router("/classes/givenprof", &home.ClassesController{}, "get:GivenProficiencies")
    beego.Router("/backgrounds/proficiencies/skills", &home.BackgroundsController{}, "post:GetSkillProficiency")
}