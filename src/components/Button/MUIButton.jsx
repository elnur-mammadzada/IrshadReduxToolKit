import { Button } from "@mui/material";
import React from "react";

const MUIButton = ({ text, variant, color, onClick }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        margin: "60px 0",
      }}>
      <Button variant={variant} color={color} onClick={onClick}>
        {text}
      </Button>
    </div>
  );
};

export default MUIButton;
