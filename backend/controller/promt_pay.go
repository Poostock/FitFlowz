package controller

import (
	"net/http"

	"fitflowz/entity"
	"fitflowz/config"

	"github.com/gin-gonic/gin"
)

// POST /promtpay
func CreatePromtpay(c *gin.Context) {
	var promtpay entity.PromptPay

	// bind เข้าตัวแปร promtpay
	if err := c.ShouldBindJSON(&promtpay); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// ค้นหา Payment ด้วย id
	// var payment entity.Payment
	// db.First(&payment, promtpay.PaymentID)
	// if promtpay.ID == 0 {
	// 	c.JSON(http.StatusNotFound, gin.H{"error": "payment not found"})
	// 	return
	// }

	var payment entity.Payment
	result := db.First(&payment, promtpay.PaymentID)
	if result.Error != nil {
		// Payment not found
		c.JSON(http.StatusNotFound, gin.H{"error": "payment not found"})
		return
	}

	// สร้าง promtpay
	p := entity.PromptPay{
		Proof: promtpay.Proof,
        PaymentID:  promtpay.PaymentID,
		Payment:    payment,  //โยงความสัมพันธ์กับ Entity Payment
	}

	// บันทึก
	if err := db.Create(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": p})
}

// GET /promtpay/:id
func GetPromptpay(c *gin.Context) {
	ID := c.Param("id")
	var promtpay entity.PromptPay

	db := config.DB()
	results := db.Preload("Payment").First(&promtpay, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if promtpay.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, promtpay)
}

// GET /promtpays
func ListPromptpays(c *gin.Context) {

	var promtpays []entity.PromptPay

	db := config.DB()
	results := db.Preload("Payment").Find(&promtpays)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, promtpays)
}

// DELETE /promtpays/:id
func DeletePromptpay(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM promtpays WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /promtpays
func UpdatePromptpay(c *gin.Context) {
	var promtpay entity.PromptPay

	PromptPayID := c.Param("id")

	db := config.DB()
	result := db.First(&promtpay, PromptPayID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&promtpay); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&promtpay)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}


