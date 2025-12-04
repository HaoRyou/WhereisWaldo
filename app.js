import express from 'express';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'node:url';
import indexRouter from './routers/main.js';
// import pkg from '@prisma/client';
// const { PrismaClient } = pkg;
// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';

// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL,
//     },
//   },
// });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await prisma.userforWaldo.findUnique({
//         where: { username },
//       });
//       if (!user) return done(null, false, { message: 'Incorrect username' });

//       const match = await bcrypt.compare(password, user.password);
//       if (!match) return done(null, false, { message: 'Incorrect password' });

//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await prisma.userforWaldo.findUnique({ where: { id } });
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); // parse form bodies
app.use(express.json()); // parse JSON

app.use(express.static('public'));
app.use('/', indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
