module.exports = generateMiddleWare = (schema) => {
  return (req, res, next) => {
    if (schema) {
      const result = schema.validate(req.body);

      if (result.error) {
        return res.status(400).json({
          message: 'Validation error',
          error: result.error.details[0].message,
        });
      }
    }
    next();
  };
};
