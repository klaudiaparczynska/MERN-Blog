const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const postsRoutes = require('./routes/postsRoutes')
require('./connection')

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))
app.use('/users', userRoutes)
app.use('/posts', postsRoutes)

app.listen(5000, () => console.log("server is running on port 5000"))