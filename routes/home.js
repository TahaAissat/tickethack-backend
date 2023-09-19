var express=require('express');
var router=express.Router()
const Trip = require('../models/trips');
const Cart = require('../models/cart')


// Route recherche dans collection trips à utiliser lors du click sur search de la page home.html
router.get('/search/:departure/:arrival/:date', (req,res) => {
    Trip.find({departure : new RegExp(req.params.departure , 'i' ) , arrival : new RegExp(req.params.arrival, 'i'), date:new Date(req.params.date)})
    .then(trips => {
        if(!trips){
            res.json({result : false , message : 'No trips found'})
        } else {
            res.json({result : true , trips : trips})
        }
    })   
})

// Route afin de créer un document dans la collection cart lors du click sur la page home.html
router.post('/addCart' , (req,res) => {
    const cartTrip = new Cart ({
        departure : req.body.departure,
        arrival : req.body.arrival,
        date : new Date(req.body.date),
        price : req.body.price
    })
    cartTrip.save().then(() => {
        Cart.find({departure : req.body.departure,
            arrival : req.body.arrival,
            date : new Date(req.body.date),
            price : req.body.price})
            .then(trip => {
                if(trip){
                    res.json({result:true,message:'Trip has been added to cart'})
                } else {
                    res.json({result:false,error:'Nothing added to cart'})
                }
            })
        
    })
})




module.exports=router