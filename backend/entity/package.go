package entity

import "gorm.io/gorm" 
		


type Package struct {
	gorm.Model
	PackageName string
	Description string
	Price string
	Duration_days string //ระยะเวลาแต่ละแพ็ตเก็จ
	
	// 1 Package สามารถมีชำระเงินหลายครั่ง
	Payments [] Payment `gorm:"foreignKey:PackageID"`
}