const express = require('express');
const app = express();
const path = require('path');
const expresssession = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose-connection')
const userRouter = require('./routes/usersRouter');
const producRouter = require('./routes/productsRouter');
const ownerRouter = require('./routes/ownersRouter');
const indexRouter = require('./routes/index')

require('dotenv').config();

app.use(expresssession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')


app.use('/', indexRouter)
app.use('/users', userRouter);
app.use('/products', producRouter);
app.use('/owners', ownerRouter)

app.listen(3000, function (req, res) {
    console.log('server is running');

})
