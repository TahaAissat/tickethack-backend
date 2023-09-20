var express=require('express');
var router=express.Router()
const Trip = require('../models/trips');
const Cart = require('../models/cart');
const endOfDay=require('date-fns/endOfDay');
const startOfDay=require('date-fns/startOfDay');


// Route recherche dans collection trips à utiliser lors du click sur search de la page home.html
router.get('/search/:departure/:arrival/:date', (req,res) => {
    Trip.find({departure : new RegExp(req.params.departure , 'i' ) , arrival : new RegExp(req.params.arrival, 'i'),
     date:{$gte:startOfDay(new Date(req.params.date)),$lt:endOfDay(new Date(req.params.date))}})
    .then(trips => {
        if(trips.length===0){
            res.json({result : false , message : 'No trips found'})
        } else {
            res.json({result : true , trips : trips})
        }
    })   
})

// Route afin de créer un document dans la collection cart lors du click sur la page home.html
router.post('/addCart' , (req,res) => {
    const cartTrip = new Cart ({
    trips : req.body.trips
    })
    cartTrip.save().then(() => {
        Cart.find({trips:req.body.trips})
            .populate('trips')
            .then(trips => {
                if(trips.length>0){
                    res.json({result:true,message:'Trip has been added to cart'})
                } else {
                    res.json({result:false,error:'Nothing added to cart'})
                }
            })       
    })
})





module.exports=router