package controller

import (
	"net/http"

	"fitflowz/entity"
	"fitflowz/config"

	"github.com/gin-gonic/gin"
)

// POST /payment
func CreatePayment(c *gin.Context) {
    var payment entity.Payment

    // Bind the incoming JSON request to the payment variable
    if err := c.ShouldBindJSON(&payment); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB() // Ensure this is correctly set up

    // Check if the member exists
    var member entity.Member
    if err := db.First(&member, payment.MemberID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Member not found"})
        return
    }

    // Check if the package exists
    var pac entity.Package
    if err := db.First(&pac, payment.PackageID).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Package not found"})
        return
    }

    // Create a new payment record
    pay := entity.Payment{
        PaymentMethodName: payment.PaymentMethodName,
        Amount:            payment.Amount,
        MemberID:         payment.MemberID, // Associate with Member entity
        Member:           member,
        PackageID:        payment.PackageID, // Associate with Package entity
        Package:          pac,
    }

    // Save the payment record to the database
    if err := db.Create(&pay).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Respond with success
    c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": pay})
}


// GET /payment/:id
func GetPayment(c *gin.Context) {
	ID := c.Param("id")
	var payment entity.Payment

	db := config.DB()
	results := db.Preload("Member").Preload("Package").First(&payment, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if payment.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, payment)
}

// GET /payments
func ListPayments(c *gin.Context) {

	var payments []entity.Payment

	db := config.DB()
	results := db.Preload("Member").Preload("Package").Find(&payments)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, payments)
}

// DELETE /payments/:id
func DeletePayments(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM payments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /payments
func UpdatePayment(c *gin.Context) {
	var payment entity.Payment

	PaymentID := c.Param("id")

	db := config.DB()
	result := db.First(&payment, PaymentID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&payment)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}


