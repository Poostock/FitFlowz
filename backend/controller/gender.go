package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"fitflowz/config"
	"fitflowz/entity"

)
func ListGenders(c *gin.Context) {
	var gender []entity.Gender

	db := config.DB()

	db.Find(&gender)

	c.JSON(http.StatusOK, &gender)
}