package controller

import (
	"net/http"

	"fitflowz/entity"
	"fitflowz/config"

	"github.com/gin-gonic/gin"
)

// POST /member
func CreateMember(c *gin.Context) {
	var member entity.Member

	// bind เข้าตัวแปร member
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// ค้นหา gender ด้วย id
	var gender entity.Gender
	db.First(&gender, member.GenderID)
	if gender.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}


	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashedPassword, _ := config.HashPassword(member.Password)

	// สร้าง Member
	m := entity.Member{
		Username: member.Username,
		Password:  hashedPassword,
		Email:     member.Email,
        FirstName: member.FirstName,
        LastName:  member.LastName,
        GenderID:  member.GenderID,
		Gender:    gender,  //โยงความสัมพันธ์กับ Entity Gender
	}

	// บันทึก
	if err := db.Create(&m).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": m})
}

// GET /member/:id
func GetMember(c *gin.Context) {
	ID := c.Param("id")
	var member entity.Member

	db := config.DB()
	results := db.Preload("Gender").First(&member, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if member.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, member)
}

// GET /members
func ListMembers(c *gin.Context) {

	var members []entity.Member

	db := config.DB()
	results := db.Preload("Gender").Find(&members)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, members)
}

// DELETE /members/:id
func DeleteMember(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /members
func UpdateMember(c *gin.Context) {
	var member entity.Member

	MemberID := c.Param("id")

	db := config.DB()
	result := db.First(&member, MemberID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&member)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

func CountMembers(c *gin.Context) {
	var count int64
	db := config.DB()
	if err := db.Model(&entity.Member{}).Count(&count).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"count": count})
}

func CheckSubscription(c *gin.Context) {
    var member entity.Member
    var payment entity.Payment // Assuming you have a Payment struct in the entity package

    MemberID := c.Param("id")

    db := config.DB()

    // First, check if the member exists
    result := db.First(&member, MemberID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Member ID not found"})
        return
    }

    // Check if there is a payment record for this member
    paymentResult := db.Where("member_id = ?", MemberID).First(&payment)
    if paymentResult.Error != nil {
        c.JSON(http.StatusOK, gin.H{"message": "Not subscribed (No payment found)"})
        return
    }

    // If a payment is found, assume the member is subscribed
    c.JSON(http.StatusOK, gin.H{"message": "Subscribed"})
}


