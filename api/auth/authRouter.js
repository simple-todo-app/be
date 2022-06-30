const router = require('express').Router();
const Auth = require('./authModel.js');
const { checkEmail, restricted } = require('./authMiddle.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
    Auth.getAllUsers()
        .then((users) => {
            if (users.length > 0) res.status(200).json(users);
            else res.json({ message: `Could not find any users!` });
        })
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Auth.getUserById(id)
        .then((user) => {
            if (user.length > 0) res.status(200).json(user);
            else res.json({ message: `Could not find user with an ID of ${id}` });
        })
        .catch(next);
});

router.post('/register', checkEmail, (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password required' });
    }

    const emailLowerCase = email.toLowerCase();
    const hash = bcrypt.hashSync(password, 12);

    Auth.insertUser({
        email: emailLowerCase,
        password: hash,
    })
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password required' });
    }

    Auth.getUserBy({ email })
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {``
          const token = generateToken(user);
          res.status(200).json({ message: `Hello there, ${user.email}`, id: user.user_id, token });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      }).catch(error => {
        res.status(500).json(error);
      });
});

const generateToken = (user) => {
  const payload = {
    id: user.user_id,
    email: user.email
  };
  const secret = process.env.SECRET;
  const options = { expiresIn: '1d' };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
