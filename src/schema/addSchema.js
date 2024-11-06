import * as yup from "yup";

export const validationSchema = yup.object().shape({
  imageUrl: yup
    .string()
    .url("Düzgün URL formatı daxil edin")
    .required("Şəkil URL mütləqdir"),
  name: yup.string().required("Məhsulun adı mütləqdir"),
  description: yup.string().required("Məlumat mütləqdir"),
  price: yup
    .number()
    .positive("Qiymət müsbət olmalıdır")
    .required("Qiymət mütləqdir"),
});
