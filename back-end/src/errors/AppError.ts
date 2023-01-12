import { Response } from "express";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const handleError = (err: AppError, resp: Response) => {
  const { statusCode, message } = err;
  return resp.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export { AppError, handleError };
