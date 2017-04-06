package home

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type UsersController struct {
	beego.Controller
}

type UserGetResponse struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Data []orm.Params `json:"users"`
	UserId int64 `json:"cur_us"`
}

func (this *UsersController) Get() {
	user := this.GetSession("user")
	if user != nil {
		resp := UserGetResponse{Success: true, Error: "", UserId: user.(models.User).User_id}
		resp.Data = models.GetUsers(user.(models.User).Clearance)
		resp.Data = SortUsers(resp.Data, user.(models.User).User_id, 0)
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func SortUsers(users []orm.Params, lead_id int64, cur_in int) []orm.Params {
	return_users := users
	if users[cur_in]["User_id"].(int64) != lead_id {
		return_users = SortUsers(users, lead_id, cur_in + 1)
		temp := return_users[cur_in + 1]
		return_users[cur_in + 1] = return_users[cur_in]
		return_users[cur_in] = temp
	}
	return return_users
}
