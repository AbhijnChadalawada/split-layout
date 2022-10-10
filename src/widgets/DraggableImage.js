import React from "react";
import { useDrag } from "react-dnd";

import { IMAGE_TYPE } from "../utils/utilities";

function DraggableImage({ image, alt }) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: IMAGE_TYPE,
    item: { id: alt },
  }));
  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <img
      style={{ width: "100%", height: "100%" }}
      ref={drag}
      src={image}
      alt={alt}
    />
  );
}

export default DraggableImage;
