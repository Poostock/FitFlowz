package entity

import "gorm.io/gorm"

type Trainer struct {
	gorm.Model
	Name string

	// 1 Trainer เป็นเจ้าของได้หลาย Classes
	Classes []Class `gorm:"foreignKey:ClassTypeID"`
}