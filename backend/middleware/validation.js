const Joi = require("joi");

const schema = Joi.object().keys({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(150).required(),
    status: Joi.string()
    .valid("TODO", "DONE")
    .default("TODO"),

  fileName: Joi.string() // can validate Buffer (PDF)
    .optional(),

  createdOn: Joi.date()
    .default(() => new Date()),

  deadline: Joi.date()
    .greater("now")
    .required()
})

const validateTask = (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false, // show all errors
    stripUnknown: true // remove extra fields
  });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message)
    });
  }

//   req.validatedTask = value;// attach validated data
  next();
};
 
module.exports = {validateTask,}