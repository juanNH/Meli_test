const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof HttpError) {
    console.error(err.message); // Log the error for debugging
    return res.status(err.statusCode).send({ message: err.message });
  } else {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Server Error", message: err.message });
  }
};
class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
module.exports = { errorHandler, HttpError };
