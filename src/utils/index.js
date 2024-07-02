const util = {};

util.handleErrors = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

util.handleRoteError = async (req, res, next) => {
    next({ status: 404, message: "Try a different route" }      
    )
};

util.expressErrorHandler = (err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}"; message: ${err.message}`);
    res
      .setHeader("Content-Type", "application/json")
      .status(500)
      .json({ error: err.message });
}

util.handleUncaughtException = (err, origin) => {
  const response = {
    Process: process.stderr.fd,
    "Caught exception": `${err.name}: ${err.message}`,
    "Exception origin": origin,
    "Stack trace": err.stack,
  };
  console.error("Uncaught Exception -> ", response);
};

util.handleUnhandledRejection = (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
};

module.exports = util;