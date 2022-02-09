const express = require('express');
const connectDB = require('./database/db')
const cors = require('cors')
const app = express();
//cors configuration
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

//create server


//database connect
connectDB();

//enable express.json
app.use(express.json({ extended:true }));

//app PORT
const port = process.env.PORT || 4000;

//import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/tasks', require('./routes/tasks'));

//start app
app.listen(port, '0.0.0.0', () =>{
    console.log(`Server UP at ${port} Port.`)
})