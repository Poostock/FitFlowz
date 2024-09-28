package controller

import (
	"log"
	"net/http"

	"fitflowz/entity"
	"fitflowz/config"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /classes
func CreateClass(c *gin.Context) {
    var class entity.Class

    // Bind to class variable
    if err := c.ShouldBindJSON(&class); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Log incoming request data
    log.Printf("Received data: %+v\n", class)

    db := config.DB()

    // Validate classType
    var classtype entity.ClassType
    db.First(&classtype, class.ClassTypeID)
    if classtype.ID == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "classType not found"})
        return
    }

    // Validate trainer
    var trainer entity.Trainer
    db.First(&trainer, class.TrainerID)
    if trainer.ID == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "trainer not found"})
        return
    }

    // Validate admin
    var admin entity.Admin
    db.First(&admin, class.AdminID)
    if admin.ID == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "admin not found"})
        return
    }

    // Create Class
    cl := entity.Class{
        ClassName: class.ClassName,
        Deets:  class.Deets,
        StartDate:  class.StartDate,
        EndDate:  class.EndDate,
        TrainerID:  class.TrainerID,
        Trainer: trainer,
        ClassPic:  class.ClassPic,
        ParticNum: class.ParticNum,
        ClassTypeID:  class.ClassTypeID,
        ClassType:    classtype,
        AdminID:  class.AdminID,
        Admin:    admin,
    }

    // Save to database
    if err := db.Create(&cl).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": cl})
}


// GET /class/:id
func GetClass(c *gin.Context) {
	ID := c.Param("id")
	var class entity.Class

	db := config.DB()
	results := db.Preload("ClassType").Preload("Trainer").Preload("Admin").First(&class, ID)
	if results.Error != nil {
        if results.Error == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "Class not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        }
        return
    }
	if class.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, class)
}

// GET /classes
func ListClasses(c *gin.Context) {

	var classes []entity.Class

	db := config.DB()
	results := db.Preload("ClassType").Preload("Trainer").Preload("Admin").Find(&classes)
	if results.Error != nil {
        if results.Error == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "Class not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        }
        return
    }
	c.JSON(http.StatusOK, classes)
}

// DELETE /classes/:id
func DeleteClass(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM classes WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /classes
func UpdateClass(c *gin.Context) {
	var class entity.Class

	UserID := c.Param("id")

	db := config.DB()
	result := db.First(&class, UserID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&class); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&class)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// GET /classes/count
func CountClasses(c *gin.Context) {
	var count int64
	db := config.DB()
	if err := db.Model(&entity.Class{}).Count(&count).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"count": count})
}
