const jwt = require('jsonwebtoken');

const validateJWT = (req, resp, next) => {
    // Leer el token del header
    const token = req.header('x-token');

    // Si el token no está presente, retorna un error 401
    if (!token) {
        return resp.status(401).json({
            ok: false,
            mensaje: 'No se proporcionó un token de autorización',
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        
        next();

    } catch (error) {
        // Si el token no es válido, retorna un error 401
        resp.status(401).json({
            ok: false,
            mensaje: 'Token no válido',
        });
    }
};

module.exports = {
    validateJWT,
};

