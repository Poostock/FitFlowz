package entity

import "gorm.io/gorm"

type ClassType struct {
	gorm.Model
	Name string

	// 1 ClassType เป็นเจ้าของได้หลาย Class
	Classes []Class `gorm:"foreignKey:ClassTypeID"`
}