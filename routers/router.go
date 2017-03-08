package routers

import (
	"github.com/Penun/ddcharcrea/controllers"
	"github.com/Penun/ddcharcrea/controllers/home"
	"github.com/Penun/ddcharcrea/controllers/home/chars"
	"github.com/Penun/ddcharcrea/controllers/home/camps"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.LoginController{})
    beego.Router("/main", &home.MainController{})
    beego.Router("/main/logout", &controllers.LoginController{}, "get:Logout")
    beego.Router("/characters", &chars.CharacterController{}, "post:GetCharList")
    beego.Router("/characters/details", &chars.CharacterController{}, "post:GetCharDetails")
    beego.Router("/characters/insert", &chars.CharacterController{}, "post:Insert")
    beego.Router("/characters/delete", &chars.CharacterController{}, "post:Delete")
    beego.Router("/characters/update", &chars.CharacterController{}, "post:Update")
    beego.Router("/races/list", &chars.RaceController{}, "get:GetRaces")
    beego.Router("/races/subs", &chars.RaceController{}, "post:GetSubRaces")
    beego.Router("/races/features", &chars.RaceController{}, "post:GetRaceFeatures")
    beego.Router("/users", &home.UsersController{})
    beego.Router("/classes/list", &chars.ClassesController{}, "get:GetClasses")
    beego.Router("/classes/paths", &chars.ClassesController{}, "post:GetClassPaths")
    beego.Router("/classes/givenprof", &chars.ClassesController{}, "get:GivenProficiencies")
    beego.Router("/backgrounds/list", &chars.BackgroundsController{}, "get:GetBackgrounds")
    beego.Router("/proficiencies/chosen", &chars.ProficienciesController{}, "post:ChosenProficiencies")
    beego.Router("/proficiencies/background", &chars.ProficienciesController{}, "post:BGProficiencies")
    beego.Router("/proficiencies/skills", &chars.ProficienciesController{}, "get:SkillProficiencies")
    beego.Router("/proficiencies/class", &chars.ProficienciesController{}, "post:ClassProficiencies")
	beego.Router("/campaigns", &camps.CampaignController{}, "get:GetCampaigns")
}
