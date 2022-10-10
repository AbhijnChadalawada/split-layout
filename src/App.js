import React from "react";

import Editor from "./panes/Editor";
import { APP_BACKGROUND_COLOR } from "./utils/utilities";

function App() {
  return (
    <div style={{ backgroundColor: APP_BACKGROUND_COLOR }}>
      <Editor />
    </div>
  );
}

export default App;
