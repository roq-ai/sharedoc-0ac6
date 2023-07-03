import * as yup from 'yup';

export const documentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  metadata: yup.string(),
  folder_id: yup.string().nullable(),
});
