const { use } = require('passport');
const passport = require('passport');
const { connect } = require('../app');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../datacon')
const helpers = require('../helpers/helpers')
const { body,validationResult } = require("express-validator");


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'Contraseña',
    passReqToCallback: true
    
}, async (req,username,password,done) => {
    const {Nombre , Apellido } = req.body
    const usuario = {
        Nombre,
        Apellido,
        username,
        password
    };
    console.log(username)
    let bandera = 0
    const usuarioscons = await pool.query('SELECT username FROM usuarios')
    for (let i = 0; i< usuarioscons.length;i++){
        if (usuarioscons[i].username == username){
            bandera++
        }
    }


    //Modificar por ifs no anidados
    if(usuario.Nombre == "" || helpers.contNum(usuario.Nombre)){
        console.log('fallo nombre')
         done(null,false,req.flash('warning', 'El campo Nombre es obligatorio y no puede tener numeros'))
    }else if (usuario.Apellido == "" || helpers.contNum(usuario.Apellido)){
        console.log('fallo apellido')
         done(null,false,req.flash('warning', 'El campo Apellido es obligatorio y no puede tener numeros'))
    }else if (bandera != 0){
        console.log('usuario no disponible')
         done(null,false,req.flash('warning', `El username ${username} no esta disponible`)) 
    }else if (username === ""){
        done(null, false, req.flash('warning', 'El campo username es obligatorio')) 
    }
    else{
        const result = await pool.query('INSERT INTO usuarios set ?', [usuario])
        usuario.id = result.insertId
        return done(null,usuario,req.flash('success','El usuario fue creado correctamente'))    
    }
    
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'Contraseña',
    passReqToCallback: true
}, async (req,username,password,done)=>{
      const row = await pool.query('select * from usuarios where username = ?',[username])
      const user = row[0]
      if (row.length > 0){
        if (user.username === username){
            if(user.password === password){
                
                done(null,user,req.flash('success',"welcome" + user.username))
            }else{
                
                done(null,false,req.flash('warning','*contraseña incorrecta'))
            }
        }
    }else{
        done(null,false,req.flash('warning','*Este usuario no se encuentra en la base de datos'))
        
    }
      
}))


passport.serializeUser((usuario,done) =>{
        done(null,usuario.id);
})

passport.deserializeUser( async (id,done) =>{
    try{
        const rows = await pool.query("select * from usuarios where id = ?",[id] ) 
        done(null,rows[0]);
    } catch(e){
        console.log(e)
    }
     
})