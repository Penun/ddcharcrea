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
    beego.Router("/characters/delete", &home.CharacterController{}, "post:Delete")
    beego.Router("/races/list", &home.RaceController{}, "get:GetRaces")
    beego.Router("/races/subs", &home.RaceController{}, "post:GetSubRaces")
    beego.Router("/races/features", &home.RaceController{}, "post:GetRaceFeatures")
    beego.Router("/users", &home.UsersController{})
    beego.Router("/classes/list", &home.ClassesController{}, "get:GetClasses")
    beego.Router("/classes/paths", &home.ClassesController{}, "post:GetClassPaths")
    beego.Router("/classes/givenprof", &home.ClassesController{}, "get:GivenProficiencies")
    beego.Router("/backgrounds/list", &home.BackgroundsController{}, "get:GetBackgrounds")
    beego.Router("/proficiencies/chosen", &home.ProficienciesController{}, "post:ChosenProficiencies")
    beego.Router("/proficiencies/background", &home.ProficienciesController{}, "post:BGProficiencies")
    beego.Router("/proficiencies/skills", &home.ProficienciesController{}, "get:SkillProficiencies")
    beego.Router("/proficiencies/class", &home.ProficienciesController{}, "post:ClassProficiencies")
}