const fs = require('fs');
const formRegister = require('../models/formRegister');

const deletePhotography = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}

const updateImage = async (tipo, id, nameFile) => {
    
    let pathViejo = '';
    if (tipo === 'Form') {
        try {
            const formregister = await formRegister.findByIdAndUpdate(id);
            if (!formregister) {
                console.log('No es registro por id');
                return false;
            }
            pathViejo = `./uploads/Form/${formregister.Photography}`;
            deletePhotography(pathViejo);
            formregister.Photography = nameFile;
            await formregister.save();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = { 
    updateImage
}
