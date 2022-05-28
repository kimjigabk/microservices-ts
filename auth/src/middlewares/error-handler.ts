import { Request, Response, NextFunction } from 'express';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

// Error response structure
// {
//     errors: {
//         message: string, field?:string
//     }[]
// }
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });

    return res.status(400).send({ errors: formattedErrors });
  }
  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: [{ message: err.reason }] });
  }
  res.status(400).send({ errors: [{ message: 'Something went wrong' }] });
};
