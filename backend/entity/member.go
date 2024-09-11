package entity

import (
	"gorm.io/gorm"
)

type Member struct {

	gorm.Model

	FirstName string    

	LastName  string    

	Email     string    

	Username string 	

	Password  string    

	GenderID  uint     
	Gender    Gender  `gorm:"foreignKey:GenderID"`

	Bookings []Booking `gorm:"foreignKey:MemberID"`

}