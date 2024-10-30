import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CardMedia,
  Grid2,
  CircularProgress,
} from "@mui/material";
import { getUserById } from "../../../features/productSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { userById, isLoading } = useSelector((state) => state.product);

  if (isLoading) return <CircularProgress />;

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  return (
    <Box sx={{ padding: 4, marginTop: 4 }}>
      <Grid2 container spacing={4}>
        <Grid2 xs={12} md={6}>
          <CardMedia
            component='img'
            height='400'
            image={userById.imageUrl}
            alt={userById.name}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              objectFit: "contain",
            }}
          />
        </Grid2>

        <Grid2 xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant='h4' component='h1' gutterBottom>
              {userById.name}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {userById.description}
            </Typography>
            <Typography variant='h5' sx={{ fontWeight: "bold", marginTop: 2 }}>
              Qiymət: {userById.price} AZN
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ProductDetails;
