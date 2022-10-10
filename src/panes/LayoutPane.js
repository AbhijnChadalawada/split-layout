import React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import CellGrid from "../widgets/CellGrid";

function LayoutPane(props) {
  const { layout, samples, ...childProps } = props;
  return (
    <Stack>
      {Object.entries(layout).map(([uuid, cell]) => (
        <Paper
          key={uuid}
          sx={{ aspectRatio: "1 / 1", width: 380, maxHeight: 380 }}
        >
          <CellGrid
            path={[uuid]}
            layout={cell}
            samples={samples}
            {...childProps}
          />
        </Paper>
      ))}
    </Stack>
  );
}

export default LayoutPane;
