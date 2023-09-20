var express=require('express');
var router=express.Router();
const Booking=require('../models/bookings')

router.get('/display',(req,res) => {
    Booking.find()
    .populate('booking')
    .then(bookedTrips => {
        res.json({result:true,bookedTrips})
    })
})

module.exports=router