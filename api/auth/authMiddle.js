const { getUserBy } = require('./authModel');
const jwt = require('jsonwebtoken');

const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailLowercase = email.toLowerCase();
    const [user] = await getUserBy({ email: emailLowercase });
    if (!user) {
      next();
    } else {
      res.status(401).json({ message: 'A user with that email already exists.' })
    }
  } catch (err) {
    next(err);
  };
}

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next({ status: 401, message: 'Token required' })
  } else {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      next({ status: 401, message: 'Token invalid' });
    }
    req.decodedJWT = decoded;
    next();
  });
  }
  
}

module.exports = {
  checkEmail,
  restricted
}