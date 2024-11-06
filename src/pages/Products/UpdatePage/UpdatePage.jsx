import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../schema/addSchema";
import { updateProducts } from "../../../features/productSlice";

const UpdateProduct = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const {
    product: { userById },
  } = useSelector((state) => state);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if (userById) {
      setValue("name", userById.name);
      setValue("price", userById.price);
      setValue("description", userById.description);
      setValue("imageUrl", userById.imageUrl);
    }
  }, [userById, setValue]);

  const onSubmit = (data) => {
    dispatch(
      updateProducts({
        id: userById.id,
        ...data,
      })
    );
    onClose();
    console.log(data);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        }}>
        <DialogTitle>Yeni Məhsul</DialogTitle>
        <DialogContent>
          <Controller
            name='imageUrl'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                margin='dense'
                placeholder='Şəkil URL'
                fullWidth
                variant='standard'
              />
            )}
          />
          {errors.imageUrl && <p>{errors.imageUrl.message}</p>}

          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                margin='dense'
                placeholder='Məhsulun adı'
                fullWidth
                variant='standard'
              />
            )}
          />
          {errors.name && <p>{errors.name.message}</p>}

          <Controller
            name='description'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                margin='dense'
                placeholder='Məlumat'
                fullWidth
                variant='standard'
              />
            )}
          />
          {errors.description && <p>{errors.description.message}</p>}

          <Controller
            name='price'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                margin='dense'
                placeholder='Qiymət'
                fullWidth
                variant='standard'
                error={!!errors.price}
              />
            )}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </DialogContent>
        <DialogActions>
          <Button type='submit'> Düzəliş et</Button>
          <Button onClick={onClose}> Ləğv et</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default UpdateProduct;
