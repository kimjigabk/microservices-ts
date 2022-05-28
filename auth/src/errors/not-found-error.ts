import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  reason = 'Page Not Found';
  statusCode = 404;
  constructor() {
    super('Not Found Error');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

// This will communicate to the error handling middleware
