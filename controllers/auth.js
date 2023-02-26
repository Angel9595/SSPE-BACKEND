const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const login = async (req, resp = response) => {

    const { email, password } = req.body
    try {
        const userDB = await User.findOne({ email });
        //verificar email
        if (!userDB) {
            return resp.status(404).json({
                ok: false,
                mensaje: "email no encontrado"
            })
        }
        //verificar contrasena
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                mensaje: "Password no encontrado"
            })
        };

        //Generar JWT
        const token = await generateJWT(userDB.id)

        resp.status(200).json({
            ok: true,
            mensaje: "bievenido",
            token
        })

    } catch (error) {
        console.log(error);

        resp.status(500).json({
            ok: false,
            mensaje: "Hable con el administrador"
        })
    }

}


module.exports = {
    login
}