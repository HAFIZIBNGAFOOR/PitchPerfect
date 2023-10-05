const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const userRoute = require('./routes/user.route');
const turfAdminRoutes = require("./routes/turfAdmin.route")
require('dotenv').config();
const dbConnect = require('./config/mongodb');
const adminRoute = require('./routes/admin.route');
dbConnect()

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())
app.use('/',userRoute);
app.use('/admin',adminRoute)
app.use(turfAdminRoutes);









const PORT =  process.env.PORT
app.listen(PORT,()=>console.log(`server started running at port ${PORT}`))