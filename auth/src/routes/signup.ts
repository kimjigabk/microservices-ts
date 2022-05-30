import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('password must be between 4 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    //   if (!email || typeof email !== 'string') {
    //     res.status(400).send('Provide valid email');
    //   }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    // Check a user with this email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log('User exists');
      throw new BadRequestError('User already exists');
    }
    // Hash password (done in user model)

    // Create new User and save to DB
    const user = User.build({ email, password });
    await user.save();

    // Login, Send token
    // Generate Token
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    // Store it to Session
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
