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

// Route pour 
router.post('/purchase' , (req,res) => {
    Cart.find()
    .then(tripsCart=>{
        for(let trip of tripsCart){
            const tripBooked = new Booking ({
                booking : trip.trips
             })
        tripBooked.save().then(()=>{
            console.log('trip saved')
        })
        }
        Cart.deleteMany({}).then(()=>{
            res.json({result:true,message:'Trip have been booked'})  
        })
      })
        }

//}
)
//Booking.deleteMany().then(console.log('deleted'))
//})

// Route pour suppression d'un voyage de la collection cart
router.delete('/deleteCart' , (req,res) =>{
    Cart.deleteOne({
        trips:req.body.id
    })
        .then(data => {
            if (data.deletedCount > 0){ 
                res.json({ result : true , message : 'Trip has been deleted from cart'})
            } else {
                res.json({ result : false , error : 'Trip not found in database'})
            }
        })
})

module.exports=router