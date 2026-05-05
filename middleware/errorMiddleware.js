const errorHandler = (err, req, res, next) => {
  res.status(400).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;