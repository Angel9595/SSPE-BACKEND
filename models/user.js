const {Schema,model} = require ('mongoose');


const UserSchema =Schema({
    name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true,
        unique: true
    },

    password:{
        type:String,
        require:true
    }
});



// metodo utilizado para personalizar el objeto JSON que se devuelve al cliente se utilizo para cambiar el _id por uid.
UserSchema.method('toJSON', function(){
     const {__v, _id, ...Object} = this.toObject()
     Object.uid = _id;
     return Object
});

module.exports = model('user',UserSchema);