package home

import (
	"github.com/Penun/ddcharcrea/models"
	"github.com/astaxie/beego"
	"encoding/json"
//	"fmt"
)

type ClassesController struct {
	beego.Controller
}

type ClPaListReq struct {
	ClassId int64 `json:"c_id"`
}

type ClassListResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	Data []models.Class `json:"classes"`
}

type ClPaListResp struct {
	Success bool `json:"success"`
	Error string `json:"error"`
	ClassId int64 `json:"c_id"`
	Data []models.ClassPath `json:"class_paths"`	
}

func (this *ClassesController) GetClasses() {
	user := this.GetSession("user")
	if user != nil {
		resp := ClassListResp{Success: true, Error: ""}
		resp.Data = models.GetClassList()
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func (this *ClassesController) GetClassPaths() {
	user := this.GetSession("user")
	if user != nil {
		var alPaLiReq ClPaListReq
		err := json.Unmarshal(this.Ctx.Input.RequestBody, &alPaLiReq)
		resp := ClPaListResp{Success: false, Error: ""}
		if err == nil {
			resp.Success = true
			resp.ClassId = alPaLiReq.ClassId
			resp.Data = models.GetClassPathList(alPaLiReq.ClassId)
		}
		this.Data["json"] = resp
		this.ServeJSON()
	} else {
		this.Redirect("/", 302)
	}
}

func (this *ClassesController) GivenProficiencies() {
	user := this.GetSession("user")
	if user != nil {
		this.Redirect("/main", 302)
	} else {
		this.Redirect("/", 302)		
	}
}