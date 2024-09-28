package controller

import (
	// "errors"

	"net/http"

	// "time"

	"github.com/gin-gonic/gin"

	// "gorm.io/gorm"

	"fitflowz/entity"
	"fitflowz/config"

	"fitflowz/services"
)


type (

Authen struct {

    Username    string `json:"username"`

    Password string `json:"password"`

}

)

func SignIn(c *gin.Context) {
	var payload Authen
	var member entity.Member
	var admin entity.Admin

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่าเป็น Member หรือ Admin
	if err := config.DB().Where("username = ?", payload.Username).First(&member).Error; err == nil {
		// หากเจอ Member
		if !config.CheckPasswordHash([]byte(payload.Password), []byte(member.Password)) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "password is incorrect"})
			return
		}

		jwtWrapper := services.JwtWrapper{
			SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
			Issuer:          "AuthService",
			ExpirationHours: 24,
		}

		signedToken, err := jwtWrapper.GenerateToken(member.Username)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
			return
		}

		// ส่งข้อมูลกลับไปพร้อมบทบาทของ Member
		c.JSON(http.StatusOK, gin.H{"token_type": "Bearer", "token": signedToken, "role": "member", "id": member.ID})
		return
	}

	// ตรวจสอบว่าเป็น Admin
	if err := config.DB().Where("username = ?", payload.Username).First(&admin).Error; err == nil {
		// หากเจอ Admin
		if !config.CheckPasswordHash([]byte(payload.Password), []byte(admin.Password)) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "password is incorrect"})
			return
		}

		jwtWrapper := services.JwtWrapper{
			SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
			Issuer:          "AuthService",
			ExpirationHours: 24,
		}

		signedToken, err := jwtWrapper.GenerateToken(admin.Username)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
			return
		}

		// ส่งข้อมูลกลับไปพร้อมบทบาทของ Admin
		c.JSON(http.StatusOK, gin.H{"token_type": "Bearer", "token": signedToken, "role": "admin", "id": admin.ID})
		return
	}

	// หากไม่พบผู้ใช้
	c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
}