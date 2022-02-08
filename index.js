const express = require('express');
const connectDB = require('./database/db')

//create server
const app = express();

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