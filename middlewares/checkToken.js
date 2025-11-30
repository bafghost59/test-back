import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; 

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    

if (!authHeader) {
    return res.status(401).json({error: "Token manquant"});
}

const token = authHeader.split(' ')[1];
  console.log('Token =', token);
  console.log('JWT_SECRET défini ?', !!JWT_SECRET);

try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded =', decoded);
    req.user = decoded; 
    next ();
} catch (error) {
    console.log('JWT error', error)
    return res.status(401).json({error: "Token invalide ou expiré"});
}
}

export default verifyToken; 

