package controller

import (
	"net/http"

	"fitflowz/entity"
	"fitflowz/config"

	"github.com/gin-gonic/gin"
)

// POST /booking
func CreateBooking(c *gin.Context) {
	var booking entity.Booking

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// ค้นหา Class ด้วย id
	var class entity.Class
	db.First(&class, booking.ClassID)
	if class.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Class not found"})
		return
	}

	var member entity.Member
	db.First(&member, booking.MemberID)
	if member.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Member not found"})
		return
	}


	// สร้าง booking
	b := entity.Booking{
		DateBooking: booking.DateBooking, 
		ClassID:     booking.ClassID,
		Class: class,
        MemberID:    booking.MemberID,
		Member: member,
	}

	// บันทึก
	if err := db.Create(&b).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": b})
}

// GET /booking/:id
func GetBooking(c *gin.Context) {
	ID := c.Param("id")
	var booking entity.Booking

	db := config.DB()
	results := db.Preload("Class").Preload("Member").First(&booking, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if booking.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, booking)
}

// GET /bookings
func ListBookings(c *gin.Context) {

	var bookings []entity.Booking

	db := config.DB()
	results := db.Preload("Class").Preload("Member").Find(&bookings)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, bookings)
}

// DELETE /bookings/:id
func DeleteBooking(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM bookings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /bookings
func UpdateBooking(c *gin.Context) {
	var booking entity.Booking

	BookingID := c.Param("id")

	db := config.DB()
	result := db.First(&booking, BookingID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&booking)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
