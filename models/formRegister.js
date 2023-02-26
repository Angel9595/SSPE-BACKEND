const {Schema,model} = require ('mongoose');
const user = require('./user');

const formRegister =Schema({
    name:{
        type:String,
        require:true
    },

    adress:{
        type:String,
        require:true
    },

    dateofbirth:{
        type:String,
        require:true
    },

    location:{
        type:String,
        require:true
    },

    gender:{
        type:String,
        require:true
    },

    Photography:{
        type:String,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
   
});

// metodo utilizado para personalizar el objeto JSON que se devuelve al cliente se utilizo para cambiar el _id por uid.
formRegister.method('toJSON', function(){
     const { _id, ...Object} = this.toObject()
     Object.uid = _id;
     return Object
});

module.exports = model('formRegister',formRegister);