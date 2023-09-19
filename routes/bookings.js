var express=require('express');
var router=express.Router();
const Booking=require('../models/bookings')

router.get('/display',(req,res) => {
    Booking.find().then(bookedTrip => {
        res.json({result:true,trips:bookedTrip})
    })
})

module.exports=router