import React from "react";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";

const MUIGrids = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={4}></Grid>
          <Grid size={4}></Grid>
          <Grid size={4}></Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default MUIGrids;
