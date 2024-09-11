package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"fitflowz/config"
	"fitflowz/controller"
)

const PORT = "3036"

func main() {

	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("")
	{
		// Member Routes
		router.GET("/members", controller.ListMembers)
		router.GET("/member/:id", controller.GetMember)
		router.POST("/members", controller.CreateMember)
		router.PATCH("/members", controller.UpdateMember)
		router.DELETE("/members/:id", controller.DeleteMember)
		// Gender Routes
		router.GET("/genders", controller.ListGenders)
		// Class Routes
		router.GET("/classes", controller.ListClasses)
		router.GET("/class/:id", controller.GetClass)
		router.POST("/classes", controller.CreateClass)
		router.PATCH("/classes", controller.UpdateClass)
		router.DELETE("/classes/:id", controller.DeleteClass)
		// ClassType Routes
		router.GET("/classtypes", controller.ListClassTypes)
		router.GET("/classtype/:id", controller.GetClassType)
		router.POST("/classtypes", controller.CreateClassType)
		router.PATCH("/classtypes", controller.UpdateClassType)
		router.DELETE("/classtypes/:id", controller.DeleteClassType)
		// Trainer Routes
		router.GET("/trainers", controller.ListTrainers)
		router.GET("/trainer/:id", controller.GetTrainer)
		router.POST("/trainers", controller.CreateTrainer)
		router.PATCH("/trainers", controller.UpdateTrainer)
		router.DELETE("/trainers/:id", controller.DeleteTrainer)
		// Admin Routes
		router.GET("/admins", controller.ListAdmins)
		router.GET("/admin/:id", controller.GetAdmin)
		router.POST("/admins", controller.CreateAdmin)
		router.PATCH("/admins", controller.UpdateAdmin)
		router.DELETE("/admins/:id", controller.DeleteAdmin)
		// Booking Routes
		router.GET("/bookings", controller.ListBookings)
		router.GET("/booking/:id", controller.GetBooking)
		router.POST("/bookings", controller.CreateBooking)
		router.PATCH("/bookings", controller.UpdateBooking)
		router.DELETE("/bookings/:id", controller.DeleteBooking)
	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Run the server

	r.Run("localhost:" + PORT)

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}