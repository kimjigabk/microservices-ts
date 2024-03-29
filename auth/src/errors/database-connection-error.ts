import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  reason = 'Error connecting to database';
  statusCode = 500;
  constructor() {
    super('Database Error');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

// This will communicate to the error handling middleware
