package entity

import (
	"time"

	"gorm.io/gorm"
)

type Class struct {
	gorm.Model    
	ClassName string       
	Deets     string    
	StartDate time.Time
	EndDate   time.Time   
	ClassPic  string
	ParticNum int

	TrainerID  uint
	Trainer   Trainer `gorm:"foriegnKey:TrainerID"`

	ClassTypeID  uint
	ClassType   ClassType `gorm:"foriegnKey:ClassTypeID"`
	
	AdminID uint
	Admin   Admin `gorm:"foriegnKey:AdminID"`

	Booking []Booking `gorm:"foreignKey:ClassID"`

} 
