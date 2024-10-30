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

const MUIDialog = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    imageUrl: "",
    name: "",
    description: "",
    price: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addProducts(userData));
    setUserData({
      imageUrl: "",
      name: "",
      description: "",
      price: "",
    });
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
          onSubmit: handleSubmit,
        }}>
        <DialogTitle>Yeni Məhsul</DialogTitle>
        <DialogContent>
          <TextField
           
            name='imageUrl'
            value={userData.imageUrl}
            onChange={handleChange}
            margin='dense'
            placeholder='Şəkil URL'
            fullWidth
            variant='standard'
          />
          <TextField
            name='name'
            value={userData.name}
            onChange={handleChange}
            fullWidth
            variant='standard'
            placeholder='Məhsulun adı'
          />
          <TextField
            name='description'
            value={userData.description}
            onChange={handleChange}
            margin='dense'
            placeholder='Məlumat'
            fullWidth
            variant='standard'
          />
          <TextField
            name='price'
            value={userData.price}
            onChange={handleChange}
            margin='dense'
            placeholder='Qiymət'
            fullWidth
            variant='standard'
          />
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
