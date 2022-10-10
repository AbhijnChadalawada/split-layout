import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { useDrag, useDrop } from "react-dnd";

import "./Image.css";
import {
  IMAGE_TYPE,
  ENCODED_TRANSPARENT_IMAGE,
  SPLIT_MODE_VERTICAL,
  SPLIT_MODE_HORIZONTAL,
} from "../utils/utilities";

function DraggableDroppableImage({
  imgSrc,
  imgName,
  path,
  setImageSource,
  split,
}) {
  const [openSplit, setOpenSplit] = useState(false);
  const [collectedDrag, drag, dragPreview] = useDrag(
    () => ({
      type: IMAGE_TYPE,
      item: { id: imgName },
      end: (_, monitor) => {
        // We trigger the swap behavior when a drag
        // ends on top of a cell with existing image
        if (monitor.didDrop()) {
          let result = monitor.getDropResult();
          let newSrc = result.target;
          if (newSrc) setImageSource(path, result.target);
        }
      },
    }),
    [imgName]
  );
  const [_, drop] = useDrop(
    () => ({
      accept: IMAGE_TYPE,
      drop: (item) => {
        // We trigger setting the image for this
        // cell when a valid drop is detected on it
        let target = imgName;
        if (item.id) {
          setImageSource(path, item.id);
          return {
            target,
          };
        } else {
          return undefined;
        }
      },
    }),
    [imgName]
  );

  const attachRef = (el) => {
    drag(el);
    drop(el);
  };

  const triggerVerticalSplit = () => {
    split(path, SPLIT_MODE_VERTICAL);
    setOpenSplit(false);
  };

  const triggerHorizontalSplit = () => {
    split(path, SPLIT_MODE_HORIZONTAL);
    setOpenSplit(false);
  };

  return collectedDrag.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <>
      <img
        className="border"
        style={{ width: "100%", height: "100%" }}
        onClick={() => setOpenSplit(true)}
        ref={attachRef}
        src={imgSrc ? imgSrc : ENCODED_TRANSPARENT_IMAGE}
        alt={imgName}
      />
      <Dialog open={openSplit} onClose={() => setOpenSplit(false)}>
        <DialogTitle>How would you like to split this layout?</DialogTitle>
        <DialogActions>
          <Button onClick={triggerVerticalSplit}>Vertically</Button>
          <Button onClick={triggerHorizontalSplit}>Horizontally</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DraggableDroppableImage;
