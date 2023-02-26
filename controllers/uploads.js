const path = require('path');
const fs = require('fs');


const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');


const fileUpload = async (req, resp = response) => {
    
    const type = req.params.tipo;
    const id   = req.params.id;


    // Validar tipo
    const typevalid = ['Form'];
    if ( !typevalid.includes( type ) ) {
        return resp.status(400).json({
            ok: false,
            msg: 'No es un tipo válido'
        });
    }

     //validar si existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).json({
            ok:false,
            mensaje:"no hay ningun archivo"
        })
    }

    //procesar la imagen
    const file = req.files.imagen;
    
    const nameCut = file.name.split('.');
    const extensionfile = nameCut [nameCut.length -1];

    //Validar extension
    const extensionValid  = ['png','jpg','jpeg','gif'];
    if(!extensionValid.includes(extensionfile)){
        return resp.status(400).json({
            ok:false,
            mensaje:"no es una una extension permitida"
        })
    }

    //Generar nombre de la imagen
    const nameFile = `${ uuidv4() }.${ extensionfile }`;  
    //path de la imagen
    const path = `./uploads/${type}/${nameFile}`

    // Metodo para mover la imagen
    file.mv(path, async (err)=> {
        if (err){
            console.log(err)
            return resp.status(500).json({
                ok:false,
                mensaje:"Error al mover la imagen"
            })
        }});
    

    // Actualizar base de datos
     await updateImage( type, id, nameFile );



// Enviar respuesta al cliente
resp.json({
    ok: true,
    msg: 'Archivo subido',
    nameFile
});
}


 const returnImage = (req, resp = response)=>{

     const image = req.params.image;
     const pathImage = path.join( __dirname, `../uploads/Form/${ image }` );

// imagen por defecto
if ( fs.existsSync( pathImage ) ) {
    resp.sendFile( pathImage );
} else {
    const pathImage = path.join( __dirname, `../uploads/no-img.png` );
    resp.sendFile( pathImage );
}     

  }

module.exports = {fileUpload, returnImage}