import React from "react";
import { Box } from "@mui/material";
import image1 from "../../assets/image1.webp";
const ImageCarousel = () => {
  return (
    <Box
      sx={{
        height: "100vh", // Full viewport height
        width: "100%",
        overflow: "hidden", // Ensures no scrollbars
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={image1}
        alt="Carousel Slide"
        style={{
          width: "100%",
          height: "100%",
          // objectFit: "cover", 
        }}
      />
    </Box>
  );
};

export default ImageCarousel;
