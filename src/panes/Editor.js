import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { v4 as uuidv4 } from "uuid";

import ActionBar from "./ActionBar";
import ImagePallet from "./ImagePallet";
import LayoutPane from "./LayoutPane";
import { importAll, findChildCellByPath } from "../utils/utilities";

// Styled container that will hold the different areas of our editor
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const INITIAL_LAYOUT = {
  [uuidv4()]: {
    src: "",
  },
  [uuidv4()]: {
    src: "",
  },
  [uuidv4()]: {
    src: "",
  },
  [uuidv4()]: {
    src: "",
  },
};

// This Component maintains the layout state and provides callbacks for
// setting an image to a cell and splitting a cell into two children
function Editor() {
  const [layout, setLayout] = useState(INITIAL_LAYOUT);
  const [selectedLayout, setSelectedLayout] = useState("");
  const [openSave, setOpenSave] = useState(false);
  const [layoutName, setLayoutName] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const layoutList = Object.keys(localStorage);
  const samples = importAll(require.context("../images", false, /\.(png)$/));

  const addCell = () => {
    setLayout((prevLayout) => ({
      ...prevLayout,
      [uuidv4()]: {
        src: "",
      },
    }));
  };

  const saveLayout = () => {
    if (Object.hasOwn(localStorage, layoutName)) {
      setOpenAlert(true);
    } else {
      localStorage.setItem(layoutName, JSON.stringify(layout));
      setOpenSave(false);
    }
  };

  const loadSelectedLayout = () => {
    if (Object.hasOwn(localStorage, selectedLayout)) {
      setLayout(JSON.parse(localStorage.getItem(selectedLayout)));
    }
  };

  const setCellImgSrc = (path, newSrc) => {
    setLayout((prevLayout) => {
      let newLayout = { ...prevLayout };
      let cell = findChildCellByPath(newLayout[path[0]], path.slice(1));
      cell.src = newSrc;
      return newLayout;
    });
  };

  const split = (path, mode) => {
    setLayout((prevLayout) => {
      let newLayout = { ...prevLayout };
      let cell = findChildCellByPath(newLayout[path[0]], path.slice(1));
      let imgSrc = cell.src;
      cell.children = {
        [uuidv4()]: {
          src: imgSrc,
        },
        [uuidv4()]: {
          src: imgSrc,
        },
      };
      cell.split = mode;
      cell.src = "";
      return newLayout;
    });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: 600,
        margin: "auto",
        backgroundColor: "#1A2027",
        padding: 1,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item>
            <ActionBar
              addCell={addCell}
              layoutList={layoutList}
              selectedLayout={selectedLayout}
              setSelectedLayout={setSelectedLayout}
              setOpenSave={setOpenSave}
              loadSelectedLayout={loadSelectedLayout}
            />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <ImagePallet samples={samples} />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <LayoutPane
              layout={layout}
              samples={samples}
              setImageSource={setCellImgSrc}
              split={split}
            />
          </Item>
        </Grid>
      </Grid>
      <Dialog open={openSave} onClose={() => setOpenSave(false)}>
        <DialogActions>
          <TextField
            autoFocus
            fullWidth
            label="Name this layout..."
            value={layoutName}
            onChange={(event) => setLayoutName(event.target.value)}
          />
          <Button onClick={saveLayout}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert severity="error">
          Layout with the chosen name already exists! Please enter a different
          name.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Editor;
