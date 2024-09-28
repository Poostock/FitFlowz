package controller

import (
	"net/http"

	"fitflowz/entity"
	"fitflowz/config"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GET /type
func ListClassTypes(c *gin.Context) {
	var classtypes []entity.ClassType

	db := config.DB()

	db.Find(&classtypes)

	c.JSON(http.StatusOK, &classtypes)

}

// POST /classTyp
func CreateClassType(c *gin.Context) {
	var classtype entity.ClassType

	// bind เข้าตัวแปร classtype
	if err := c.ShouldBindJSON(&classtype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()


	// สร้าง Class
	ct := entity.ClassType{
		Name: classtype.Name,
	}
	// บันทึก
	if err := db.Create(&ct).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": ct})
}

// GET /classtype/:id
func GetClassType(c *gin.Context) {
	ID := c.Param("id")
	var classtype entity.ClassType

	db := config.DB()
	results := db.First(&classtype, ID)
	if results.Error != nil {
        if results.Error == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "Class not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        }
        return
    }
	if classtype.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, classtype)
}

// DELETE /classtypes/:id
func DeleteClassType(c *gin.Context) {
	

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM class_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /classtypes
func UpdateClassType(c *gin.Context) {
	var classtype entity.ClassType

	ClassTypeID := c.Param("id")

	db := config.DB()
	result := db.First(&classtype, ClassTypeID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&classtype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&classtype)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
