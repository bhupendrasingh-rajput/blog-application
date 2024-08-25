const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) { return res.status(401).json({ message: 'No token, authorization denied' }); }

        const decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) { return res.status(400).json({ message: 'Unauthorized!' }) }

        req.body.author = decoded.userId;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
        console.log('Internal Server Error! \n', error)
    }
};

module.exports = authMiddleware;
