const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No autorizado, no se proporcionó un token' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        console.error('Error de autenticación:', error.message);
        return res.status(401).json({ error: 'No autorizado, token inválido o expirado' });
    }
};

module.exports = {
    protect
};