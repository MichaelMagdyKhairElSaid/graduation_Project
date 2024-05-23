export const validation = (schema) => {
  return (req, res, next) => {
    let inputs = { ...req.body, ...req.params, ...req.query };
    let { error } = schema.validate(inputs, { abortEarly: false });
    if (error) {
      let errors = error.details.map((detail) => detail.message);
      return res.status(400).json(errors); 
    }
    next();
  };
};
