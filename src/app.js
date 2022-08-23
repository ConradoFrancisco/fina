const express = require("express");
const morgan = require("morgan")
const mysql = require("mysql")
const myConn = require("express-myconnection")
const app = express();
const path = require("path")
const pool = require('./keys')
const passport = require('passport')
const session = require('express-session')
const MySQLStore = require('express-mysql-session') 
const flash = require("connect-flash")
module.exports = app

const {database} = require('./keys')



//middlewares
app.use(session({
    secret:"prueba",
    resave:false,
    saveUninitialized:false,
    store: new MySQLStore(database)
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session()); 


//variables globales
app.use((req,res,next) =>{
    app.locals.success = req.flash('success')
    app.locals.warning = req.flash('warning')
    app.locals.user = req.user;
    next();
});



//inicializacion
require("./passport/passport")
app.use(morgan('dev')) 

// configuraciones express
app.set("port", process.env.PORT || 3000)
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "vistas"))


app.use(express.urlencoded({extended:true}))
app.use(express.json())


// importado de las rutas
const rutasCustomer = require("./rutas/usuarios");
const rutaaut = require ("./rutas/autenticacion")
const { urlencoded } = require("express");



//Rutas
app.use('/', rutasCustomer,rutaaut) // esta constante contiene las rutas




// Inicializando el servidor
app.listen(3000,()=>{
    console.log("Server en el puerto 3000")
});






