package entity

import (
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model    
	Username string    
	Password string    
	Email   string    
	FirstName string 
	LastName   string
	
	GenderID  uint     
	Gender    Gender  `gorm:"foreignKey:GenderID"`
	
	Classes []Class `gorm:"foreignKey:AdminID"`
} 