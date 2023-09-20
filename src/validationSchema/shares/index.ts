import * as yup from 'yup';

export const shareValidationSchema = yup.object().shape({
  platform: yup.string().required(),
  date_shared: yup.date().required(),
  compatibility_id: yup.string().nullable().required(),
});
