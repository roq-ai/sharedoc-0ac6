import * as yup from 'yup';

export const tagValidationSchema = yup.object().shape({
  name: yup.string().required(),
  document_id: yup.string().nullable(),
});
