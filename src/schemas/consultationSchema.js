import joi from "joi";

const consultationSchemma = joi.object({
  doctor_id: joi.number().required(),
  patient_id: joi.number(),
  time: joi.string().required()  
});

export {
  consultationSchemma,
};