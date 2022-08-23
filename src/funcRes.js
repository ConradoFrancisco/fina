 const restricciones = {
    isloggedIn(req,res,next) {
        if(req.isAuthenticated()){
            return next()
        }
        return res.redirect('/signin')
    },


    isNotloggedIn(req,res,next){
        if(!req.isAuthenticated()){
            return next()
        }
        return res.redirect('/perfil')
    }   
 }

 module.exports = restricciones