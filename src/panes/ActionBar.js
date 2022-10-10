import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  LAYOUT_SELECTOR_LABEL_ID,
  LAYOUT_SELECTOR_LABEL_VALUE,
} from "../utils/utilities";

function ActionBar({
  addCell,
  layoutList,
  selectedLayout,
  setSelectedLayout,
  setOpenSave,
  loadSelectedLayout,
}) {
  const changeLayout = (event, setSelectedLayout) => {
    setSelectedLayout(event.target.value);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button onClick={addCell} variant="outlined">
        Add Cell
      </Button>
      <FormControl>
        <InputLabel id={LAYOUT_SELECTOR_LABEL_ID}>
          {LAYOUT_SELECTOR_LABEL_VALUE}
        </InputLabel>
        <Select
          sx={{ width: 314 }}
          labelId={LAYOUT_SELECTOR_LABEL_ID}
          value={selectedLayout}
          label={LAYOUT_SELECTOR_LABEL_VALUE}
          onChange={(event) => changeLayout(event, setSelectedLayout)}
        >
          {layoutList.map((layout, idx) => (
            <MenuItem key={idx} value={layout}>
              {layout}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={loadSelectedLayout} variant="outlined">
        Load
      </Button>
      <Button onClick={() => setOpenSave(true)} variant="outlined">
        Save
      </Button>
    </Stack>
  );
}

export default ActionBar;
