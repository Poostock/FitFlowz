package entity

import (

	"time"

	"gorm.io/gorm"
)

type Booking struct {

	gorm.Model
	DateBooking time.Time

	ClassID uint
	Class   Class `gorm:"foriegnKey:ClassID"`

	MemberID uint
	Member   Member `gorm:"foriegnKey:MemberID"`


}