import React from "react";
import Grid from "@mui/material/Grid";

import DraggableDroppableImage from "./DraggableDroppableImage";
import { SPLIT_MODE_HORIZONTAL } from "../utils/utilities";

// This Component takes care of the recursive rendering
// of a cell grid and it's children given a layout
function CellGrid(props) {
  const { path, layout, samples, ...childProps } = props;

  return (
    <Grid container sx={{ width: "100%", height: "100%" }}>
      {layout.children ? (
        Object.entries(layout.children).map(([uuid, cell]) => (
          <Grid
            key={uuid}
            item
            container={cell.children ? true : false}
            xs={layout.split === SPLIT_MODE_HORIZONTAL ? 12 : 6}
            sx={{
              height: layout.split === SPLIT_MODE_HORIZONTAL ? "50%" : "100%",
            }}
          >
            {cell.children ? (
              <CellGrid
                key={uuid}
                path={[...path, uuid]}
                layout={cell}
                samples={samples}
                {...childProps}
              />
            ) : (
              <DraggableDroppableImage
                imgSrc={cell.src ? samples[cell.src] : cell.src}
                imgName={cell.src}
                path={[...path, uuid]}
                {...childProps}
              />
            )}
          </Grid>
        ))
      ) : (
        <Grid
          item
          xs={12}
          sx={{
            height: "100%",
          }}
        >
          <DraggableDroppableImage
            imgSrc={layout.src ? samples[layout.src] : layout.src}
            imgName={layout.src}
            path={path}
            {...childProps}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default CellGrid;
