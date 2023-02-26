//importacion de modelo para creacion de nuevo usuario
const User = require("../models/user");
const { response } = require("express");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");


//funcion obtener usuarios de bd
const getUsers = async (req, resp) => {
  const users = await User.find({}, "name email password");

  
  
  resp.json({
    ok: true,
    users
  });
};


//funcion crear usuario bd
const createUser = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return resp.status(400).json({
        ok: false,
        mensaje: "email ya existe",
      });
    }

    const user = new User(req.body);

    //Encriptar la contrasena
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)



    //metodo para guardar nuevo usuario en la bd
    await user.save();
    const token = await generateJWT(user.id)

    resp.json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    console.log(error);
  }
};


const updateUser = async (req, resp) => {


  const uid = req.params.id

  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return resp.json({
        ok: "false",
        mensaje: "usuario no existe en la base de datos"
      })
    }

    //Datos que no se actualizan
    const data = req.body
    //Concidicion si ya existe algun usuario con este email
    if (userDB.email === req.body.email) {
      delete data.email
    } else {
      const existEmail = await User.findOne({ email: req.body.email });
      if (existEmail) {
        return resp.status(400).json({
          ok: false,
          mensaje: "ya existe un usuario con este email intenta con otro."
        });
      }
    }
    delete data.password

    const userUpdate = await User.findByIdAndUpdate(uid, data, { new: true })

    resp.json({
      ok: "true",
      uid,
      userUpdate
    })

  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar el usuario'
    })
  }
};

//funcion eliminar usuarios de bd
const deleteUser = async (req, resp) => {

  const uid = req.params.id

  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return resp.json({
        ok: "false",
        mensaje: "usuario no existe en la base de datos"
      })
    }

    await User.findByIdAndDelete(uid);

    resp.json({
      ok: true,
      mensaje: 'Usuario eliminado'
    });

  } catch (error) {
    console.log(error)
    resp.status(500).json({
      ok: false,
      mensaje: "Hable con el administrador"
    })
  }
};


module.exports = { getUsers, createUser, updateUser, deleteUser };
