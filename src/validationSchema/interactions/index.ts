import * as yup from 'yup';

export const interactionValidationSchema = yup.object().shape({
  type: yup.string().required(),
  user_id: yup.string().nullable(),
  document_id: yup.string().nullable(),
});
