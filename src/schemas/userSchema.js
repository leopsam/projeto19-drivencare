import joi from "joi";

const signupSchemma = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  type: joi.number().default(2).required()
});

const signinSchemma = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

export {
  signinSchemma,
  signupSchemma,
};