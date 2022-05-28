import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
  (req: Request, res: Response) => {
    //   if (!email || typeof email !== 'string') {
    //     res.status(400).send('Provide valid email');
    //   }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;

    console.log('Create user');

    res.send({});
  }
);

export { router as signupRouter };
