package routers

import (
	"github.com/Penun/ddcharcrea/controllers"
	"github.com/Penun/ddcharcrea/controllers/home"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.LoginController{})
    beego.Router("/main", &home.MainController{})
    beego.Router("/main/logout", &controllers.LoginController{}, "get:Logout")
    beego.Router("/characters", &home.CharacterController{}, "post:GetCharList")
    beego.Router("/characters/details", &home.CharacterController{}, "post:GetCharDetails")
    beego.Router("/characters/insert", &home.CharacterController{}, "post:Insert")
    beego.Router("/races/list", &home.RaceController{}, "get:GetRaces")
    beego.Router("/races/subs", &home.RaceController{}, "post:GetSubRaces")
    beego.Router("/users", &home.UsersController{})
    beego.Router("/classes/list", &home.ClassesController{}, "get:GetClasses")
    beego.Router("/classes/paths", &home.ClassesController{}, "post:GetClassPaths")
    beego.Router("/classes/chosenprof", &home.ClassesController{}, "post:ChosenProficiencies")
    beego.Router("/classes/givenprof", &home.ClassesController{}, "get:GivenProficiencies")
    beego.Router("/backgrounds/list", &home.BackgroundsController{}, "get:GetBackgrounds")
    beego.Router("/backgrounds/proficiencies/skills", &home.BackgroundsController{}, "post:GetSkillProficiency")
}