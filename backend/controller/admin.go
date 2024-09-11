package controller

import (
	"net/http"

	"fitflowz/config"
	"fitflowz/entity"

	"github.com/gin-gonic/gin"
)

// POST /Admins
func CreateAdmin(c *gin.Context) {
	var admin entity.Admin

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหา gender ด้วย id
	var gender entity.Gender
	db.First(&gender, admin.GenderID)
	if gender.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}


	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashedPassword, _ := config.HashPassword(admin.Password)

	// สร้าง User
	a := entity.Admin{
		Username: admin.Username,
		Password:  hashedPassword,
		Email:     admin.Email,
        FirstName: admin.FirstName,
        LastName:  admin.LastName,
		GenderID:  admin.GenderID,
		Gender:    gender,  //โยงความสัมพันธ์กับ Entity Gender
        
	}

	// บันทึก
	if err := db.Create(&a).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": a})
}

// GET /admin/:id
func GetAdmin(c *gin.Context) {
	ID := c.Param("id")
	var admin entity.Admin

	db := config.DB()
	results := db.Preload("Gender").First(&admin, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if admin.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, admin)
}

// GET /admins
func ListAdmins(c *gin.Context) {

	var admins []entity.Admin

	db := config.DB()
	results := db.Preload("Gender").Find(&admins)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, admins)
}

// DELETE /admins/:id
func DeleteAdmin(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM admins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /admins
func UpdateAdmin(c *gin.Context) {
	var admin entity.Admin

	AdminID := c.Param("id")

	db := config.DB()
	result := db.First(&admin, AdminID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&admin)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}