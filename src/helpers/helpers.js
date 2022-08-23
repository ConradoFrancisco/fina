const bcrypt = require ('bcryptjs');
const { database } = require('../keys');

const helpers = {}

helpers.cifrarpw = async (pw) => {
    const alg = await bcrypt.genSalt(10);
    const pwfinal = await bcrypt.hash(pw,alg);
    return pwfinal
}

helpers.comparepw = async (pw,dbpw) =>{
    try {
        return  await bcrypt.compare(pw,dbpw);
    } catch(e){
        console.log(e)
    }
    
}

helpers.contNum = (input) =>{
    
    if (input.includes("1") || input.includes("2") || input.includes("3")|| input.includes("4") || input.includes("5") || input.includes("6") || input.includes("7") || input.includes("8") || input.includes("9") || input.includes("0")){
        let msg = 'el campo no puede contener numeros'
        return {msg:msg,valor:true}
    }else{
        
        return false
    }
}





//helpers de validaciones

helpers.valVac = (prop,str) =>{
    if (str === ''){
        let msg = `El campo ${prop} no puede estar vacio ` /* + '<br/>' */
        return  data = {msg:msg,valor:true}
    }else{
        let msg = ''
        return data = {msg:msg,valor:false}
    }
}

helpers.cant = (str) =>{
    if (str.length < 3){
        let msg = 'Este campo no puede tener menos de 3 caracteres' /* + '<br/> */
        return data = {msg:msg,valor:true}
    }
}


helpers.long = (prop,str) =>{
    if (str.length < 4){
        let msg = `El campo ${prop} no puede tener una longitud menor a 4`
        return {valor:true,msg:msg}
    }else{
        return {valor:false}
    }
}




module.exports = helpers