import * as yup from 'yup';

export const instructionValidationSchema = yup.object().shape({
  description: yup.string().required(),
  date_created: yup.date().required(),
  user_id: yup.string().nullable().required(),
});
