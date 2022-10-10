import React from "react";
import Stack from "@mui/material/Stack";

import DraggableImage from "../widgets/DraggableImage";

function ImagePallet({ samples }) {
  return (
    <Stack spacing={1}>
      {Object.entries(samples).map(([name, image]) => (
        <DraggableImage key={name} image={image} alt={name} />
      ))}
    </Stack>
  );
}

export default ImagePallet;
