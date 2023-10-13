const handleNotFound = (req, res, next) => {
  //   sendError(res, `not found ${req.originalUrl}`, 404);0
  const error = new Error(`not found - ${req.originalUrl}`);

  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // res.sta#tus(500).json({ error: err.message || err });
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "castError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "resource not  Found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// const sendError = (res, error, statusCode = 401) => {
//   res.status(statusCode).json({ error });
// };

export { handleNotFound, errorHandler };
