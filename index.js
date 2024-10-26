const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifyToken = require('./api/middleware/verifyToken')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express()
//middleware
app.use(cors())
app.use(express.json())


/***************************************************************************************************************/
//Mongodb configuration using mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@quickbite-mongoose-db.hixnd.mongodb.net/quickbite-db?retryWrites=true&w=majority&appName=quickbite-mongoose-db`).then(() => console.log("Mondodb connected successfully using mongoose")).catch((error) => console.log("Error while connecting to Db", error))

//JWT authentication 
app.post('/jwt', async(req, res)=>{
  const user = req.body
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'} )
  res.send({token})
}) 

//import routes here
const menuRoutes = require('./api/routes/menuRoutes')
const cartRoutes = require('./api/routes/cartRoutes')
const userRoutes = require('./api/routes/userRoutes')
const paymentRoutes = require('./api/routes/paymentRoutes')
const adminStats = require('./api/routes/adminStats')
const getBookings = require('./api/routes/getBookings')
const ticketRoutes = require('./api/routes/ticketRoutes')
const allTickets = require('./api/routes/allTickets')

app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes)
app.use('/users', userRoutes)
app.use('/payments', paymentRoutes)
app.use('/admin-stats', adminStats)
app.use('/bookings', getBookings)
app.use('/tickets', ticketRoutes)
app.use('/all-tickets', allTickets)

/***************************************************************************************************************/

/* Stripe Payments */
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

   // Ensure the price is passed and is valid
   if (!price || price < 1) {
    return res.status(400).send({ error: "Invalid price amount" });
  }

  const amount = parseInt(price * 100)

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
});



const port = process.env.PORT || 6001;

app.get('/',verifyToken, (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})


