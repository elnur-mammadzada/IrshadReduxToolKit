import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSnackbar,
  deleteProducts,
  fetchProductItems,
} from "../../features/productSlice";
import "../Products/Products.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  Snackbar,
  Typography,
} from "@mui/material";
import MUIDialog from "../../components/Dialog/MUIDialog";
import { useNavigate, useParams } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(closeSnackbar());
  };
  const dispatch = useDispatch();
  const {
    product: { products, isSnackbarOpen, snackbarMessage },
  } = useSelector((state) => state);

  const handleCardClick = (id) => {
    navigate(`/products/${id}`); 
  };

  useEffect(() => {
    dispatch(fetchProductItems());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteProducts(id));
  };
  return (
    <div>
      <MUIDialog />
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
          {products.map(({ id, name, price, description, imageUrl }) => {
            return (
              <Grid2 key={id} size={4}>
                <Card
                  sx={{ maxWidth: 345, cursor: "pointer" }}
                  onClick={() => handleCardClick(id)}>
                  <CardMedia
                    sx={{
                      height: 140,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                    image={imageUrl}
                    title='green iguana'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {name}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: "text.secondary" }}>
                      {description}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: "text.secondary" }}>
                      {price}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(id);
                      }}
                      color='error'
                      size='small'>
                      Məhsulu sil
                    </Button>
                  </CardActions>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      </Box>
      <Snackbar
        onClose={handleClose}
        open={isSnackbarOpen}
        autoHideDuration={1000}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Products;
