package entity

import "gorm.io/gorm"
		


type PromptPay struct {
	gorm.Model 
	Proof string // เบอร์หรือเลขบัตรประชาชน

// Payment ทำหน้าที่เป็น FK
PaymentID uint
Payment   Payment `gorm:"foreignKey:PaymentID"`


}