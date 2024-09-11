package controller

import (
	"net/http"

	"fitflowz/config"
	"fitflowz/entity"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GET /trainer
func ListTrainers(c *gin.Context) {
	var trainers []entity.Trainer

	db := config.DB()

	db.Find(&trainers)

	c.JSON(http.StatusOK, &trainers)

}

// POST /trainer
func CreateTrainer(c *gin.Context) {
	var trainer entity.Trainer

	// bind เข้าตัวแปร trainer
	if err := c.ShouldBindJSON(&trainer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// สร้าง trainer
	t := entity.Trainer{
		Name: trainer.Name,
	}
	// บันทึก
	if err := db.Create(&t).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": t})
}

// GET /trainer/:id
func GetTrainer(c *gin.Context) {
	ID := c.Param("id")
	var trainer entity.Trainer

	db := config.DB()
	results := db.First(&trainer, ID)
	if results.Error != nil {
        if results.Error == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "Class not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        }
        return
    }
	if trainer.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, trainer)
}

// DELETE /trainers/:id
func DeleteTrainer(c *gin.Context) {
	

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM trainers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /trainers
func UpdateTrainer(c *gin.Context) {
	var trainer entity.Trainer

	TrainerID := c.Param("id")

	db := config.DB()
	result := db.First(&trainer, TrainerID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&trainer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&trainer)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
