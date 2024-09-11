package entity

import "gorm.io/gorm"

type Gender struct {
	gorm.Model
	Name string

	// 1 gender เป็นเจ้าของได้หลาย member
	Members []Member `gorm:"foreignKey:GenderID"`
	// 1 gender เป็นเจ้าของได้หลาย Admin
	Admins []Admin `gorm:"foreignKey:GenderID"`
}
