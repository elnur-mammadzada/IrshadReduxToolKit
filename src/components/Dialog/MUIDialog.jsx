import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MUIButton from "../Button/MUIButton";
import { Button } from "@mui/material";
import { addProducts } from "../../features/productSlice";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../schema/addSchema";

const MUIDialog = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    dispatch(addProducts(data));
    reset();
    handleClose();
  };
  return (
    <div>
      <MUIButton
        variant='contained'
        text='YARAT'
        color='success'
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose}>Ləğv et</Button>
          <Button type='submit'>Əlavə et</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MUIDialog;
