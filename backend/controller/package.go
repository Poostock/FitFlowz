package controller

import (
	"fitflowz/entity"
	"fitflowz/config"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreatePackage(c *gin.Context) {
	var pac entity.Package

	// bind เข้าตัวแปร package
	if err := c.ShouldBindJSON(&pac); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()




	// สร้าง package
	pk := entity.Package{
		PackageName: pac.PackageName,
		Description: pac.Description,
		Price: pac.Price,
		Duration_days: pac.Duration_days,
	}

	// บันทึก
	if err := db.Create(&pk).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": pk})
}

// GET /package/:id
func GetPackage(c *gin.Context) {
	ID := c.Param("id")
	var pac entity.Package

	db := config.DB()
	results := db.First(&pac, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if pac.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, pac)
}

// GET /packages
func ListPackage(c *gin.Context) {

	var pacs []entity.Package

	db := config.DB()
	results := db.Find(&pacs)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, pacs)
}

// DELETE /packages/:id
func DeletePackage(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM packages WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /packages
func UpdatePackages(c *gin.Context) {
	var pac entity.Package

	PacID := c.Param("id")

	db := config.DB()
	result := db.First(&pac, PacID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&pac); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&pac)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
