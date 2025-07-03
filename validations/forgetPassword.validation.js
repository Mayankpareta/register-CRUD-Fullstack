import Joi from "joi";

export const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().min(6).required()
});
