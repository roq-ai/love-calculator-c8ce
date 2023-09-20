import * as yup from 'yup';

export const resetValidationSchema = yup.object().shape({
  date_reset: yup.date().required(),
  user_id: yup.string().nullable().required(),
});
