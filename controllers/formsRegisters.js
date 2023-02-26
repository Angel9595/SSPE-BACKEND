const response = require('express');
 const formRegister = require('../models/formRegister');
const user = require('../models/user');

//funcion obtener datosForm de bd
const getForm = async (req, resp = response) => {
  const formregister = await formRegister.find().populate('user', 'name').select('-__v -user.__v').lean();

  resp.json({
      ok: true,
      mensaje: 'obteniendo form',
      formregister
  });
};

  
//funcion crear usuario bd
const createForm = async (req, resp = response) => {

   const uid = req.uid

   const formregister = new formRegister({
      user:uid,
    ...req.body
   });

   try {
   
    formDB = await formregister.save();

    resp.json({
      ok: true,
      mensaje:'creando form',
      formDB,
      formDB: {
        ...formDB.toObject(),
        formId: formDB._id
      }
    });
    
   } catch (error) {
    console.log(error);
    resp.json({
      ok:false,
      mensaje:'Hable con el administrador'
    })
   };
  };
  
  
  const updateForm = async (req, resp = response) => {

    const id = req.params.id
    const uid =  req.uid

    try { 

    const formregister = await formRegister.findById(id);

    if(!formregister){
          return  resp.status(400).json({
            ok:false,
            mensaje:"Formulario no encontrado"
          })
    }
   
     const changesForm = {
      ...req.body,
        user:uid
     }
     const formUpdated = await formRegister.findByIdAndUpdate(id, changesForm, {new:true})

    resp.json({
      ok: true,
      mensaje:'actualizando formulario',
      formUpdated
    });
    } catch (error) {
      console.log(error)

      resp.status(500).json({
        ok:false,
        mensaje:"Hable con el administrador"
      })
    }

  };



  //funcion eliminar usuarios de bd
const deleteForm = async (req, resp = response) => {

  const id = req.params.id

try {

  const formregister = await formRegister.findById(id);


 if(!formregister){
    return  resp.status(400).json({
      ok:false,
      mensaje:"Formulario no encontrado"
    })
}


const formDelete = await formRegister.findByIdAndDelete(id)


  resp.json({
    ok: true,
    mensaje:'elimnando form',
    formDelete
  });
  
} catch (error) {
  console.log(error);

  return resp.status(500).json({
    ok:false,
    mensaje:"Error al eliminar form"
  })
}

}
  
  module.exports = { getForm, createForm, updateForm, deleteForm };
  