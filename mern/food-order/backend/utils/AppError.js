// An error we throw on purpose; the central handler turns it into the JSON envelope
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default AppError;
