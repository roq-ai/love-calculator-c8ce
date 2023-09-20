import * as yup from 'yup';

export const compatibilityValidationSchema = yup.object().shape({
  percentage: yup.number().integer().required(),
  date_calculated: yup.date().required(),
  user1_id: yup.string().nullable().required(),
  user2_id: yup.string().nullable().required(),
});
