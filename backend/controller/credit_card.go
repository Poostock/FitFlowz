package controller

import (
	"net/http"

	"fitflowz/entity"
	"fitflowz/config"

	"github.com/gin-gonic/gin"
)

// POST /creditcard
// POST /creditcard
func CreateCreditCard(c *gin.Context) {
	var creditcard entity.CreditCard

	// Bind JSON into creditcard variable
	if err := c.ShouldBindJSON(&creditcard); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// Search for Payment by ID
	var payment entity.Payment
	result := db.First(&payment, creditcard.PaymentID)
	if result.Error != nil {
		// Payment not found
		c.JSON(http.StatusNotFound, gin.H{"error": "payment not found"})
		return
	}

	// Create CreditCard entity
	cc := entity.CreditCard{
		NameOnCard: creditcard.NameOnCard,
		CardNumber: creditcard.CardNumber,
		ExpiryDate: creditcard.ExpiryDate,
		CVV:        creditcard.CVV,
		PaymentID:  creditcard.PaymentID,
		Payment:    payment, // Link to Payment entity
	}

	// Save CreditCard
	if err := db.Create(&cc).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": cc})
}


// GET /creditcard/:id
func GetCreditCard(c *gin.Context) {
	ID := c.Param("id")
	var creditcard entity.CreditCard

	db := config.DB()
	results := db.Preload("Payment").First(&creditcard, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if creditcard.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, creditcard)
}

// GET /creditcards
func ListCreditCards(c *gin.Context) {

	var creditcards []entity.CreditCard

	db := config.DB()
	results := db.Preload("Payment").Find(&creditcards)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, creditcards)
}

// DELETE /creditcards/:id
func DeleteCreditCard(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM creditcards WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /promtpays
func UpdateCreditCard(c *gin.Context) {
	var creditcard entity.CreditCard

	CreditCardID := c.Param("id")

	db := config.DB()
	result := db.First(&creditcard, CreditCardID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&creditcard); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&creditcard)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}


