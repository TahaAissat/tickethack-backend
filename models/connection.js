const mongoose=require('mongoose');

const connectionString='mongodb+srv://penelopegrunwald:Chamallow3012!@cluster0.hzy3wsl.mongodb.net/Tickethack'

mongoose.connect(connectionString,{connectTimeoutMS:2000})
.then(()=>console.log('Database connected'))
.catch(error=>console.error(error))