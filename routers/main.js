import express from 'express';
// import bcrypt from 'bcryptjs';
// import passport from 'passport';
// import pkg from '@prisma/client';
// const { PrismaClient } = pkg;
// import jwt from 'jsonwebtoken';

const router = express.Router();
// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL,
//     },
//   },
// });

// function verifyToken(req, res, next) {
//   const token =
//     (req.body && req.body.token) ||
//     req.query.token ||
//     (req.headers.authorization && req.headers.authorization.split(' ')[1]);

//   if (!token) return res.status(401).send('No token provided');

//   try {
//     const decoded = jwt.verify(token, 'HaoRYou');
//     req.user = { id: decoded.id };
//     next();
//   } catch (err) {
//     return res.status(401).send('Invalid token');
//   }
// }

const files = [];

function addScore(name, score) {
  files.push({ name, score: Number(score) }); // ensure numeric
  files.sort((a, b) => a.score - b.score); // fastest (smallest) first
}

router.get('/', async (req, res, next) => {
  try {
    // const files = await prisma.userforWaldo.findMany();
    res.render('homepage', { score: files });
  } catch (err) {
    next(err);
  }
});

router.post('/', (req, res) => {
  const { name, score } = req.body;

  console.log('Received:', name, score);

  addScore(name, score);

  res.status(200).json({ message: 'Score saved' });
});

// router.get('/login', (req, res) => {
//   res.render('login');
// });

// router.post('/log-in', (req, res, next) => {
//   // passport.authenticate('local', { session: false }, (err, user, info) => {
//   //   if (err) return next(err);
//   //   if (!user) return res.status(401).json({ message: 'Invalid credentials' });
//   //   // ✅ Sign JWT with only user ID
//   //   const token = jwt.sign({ id: user.id }, 'HaoRYou', { expiresIn: '1h' });
//   //   // Redirect with token in query string
//   //   res.redirect(`/mainpage?token=${token}`);
//   // })(req, res, next);
// });

// router.get('/sign-up', (req, res) => res.render('sign-up-form'));

// router.post('/sign-up', async (req, res, next) => {
//   // try {
//   //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
//   //   await prisma.users.create({
//   //     data: {
//   //       username: req.body.username,
//   //       password: hashedPassword,
//   //     },
//   //   });
//   //   res.redirect('/');
//   // } catch (err) {
//   //   console.error(err);
//   //   next(err);
//   // }
// });

router.get('/gamestart', (req, res) => {
  const username = req.query.username;
  res.render('gameboard', { username });
});

export default router;
