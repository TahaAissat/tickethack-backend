var express=require('express');
var router=express.Router();
const Cart = require('../models/cart');
const Booking = require('../models/bookings')

// Route pour afficher tous les voyages dans la connection cart
router.get('/display' , (req,res) => {
    Cart.find()
    .populate('trips')
    .then(trips => {
        res.json({result:true,allTrips:trips})
    })
})

//Cart.deleteMany().then(console.log('all deleted'));

// Route pour créer un document dans la collection bookings
router.post('/book' , (req,res) => {
    const newBooking = new Booking({
        departure : req.body.departure,
        arrival : req.body.arrival,
        date : new Date(req.body.date),
        price : req.body.price
    })
    newBooking.save().then(()=>{
        Booking.find({newBooking}).then(trip=>{
            if(!trip){
                res.json({result:false,error:'Trip has not been booked'})
            } else {
                res.json({result:true,message:'Trip has been booked'})
            }
        })
    })
})

// Route pour suppression d'un voyage de la collection cart
router.delete('/deleteCart' , (req,res) =>{
    Cart.deleteOne({departure : req.body.departure,
        arrival : req.body.arrival,
        date :new Date(req.body.date),
        price : req.body.price})
        .then(data => {
            if (data.deletedCount > 0){ 
                res.json({ result : true , message : 'Trip has been deleted from cart'})
            } else {
                res.json({ result : false , error : 'Trip not found in database'})
            }
        })
})

module.exports=router