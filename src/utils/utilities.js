export function importAll(r) {
  let files = {};
  r.keys().forEach((item) => {
    files[item.replace("./", "")] = r(item);
  });
  return files;
}

export const findChildCellByPath = (cell, path) => {
  let child = path
    .slice(0)
    .reduce((currCell, childUuid) => currCell.children[childUuid], cell);
  return child;
};

export const LAYOUT_SELECTOR_LABEL_VALUE = "Layout";

export const LAYOUT_SELECTOR_LABEL_ID = "layout-selector-label";

export const SPLIT_MODE_VERTICAL = "vertical";

export const SPLIT_MODE_HORIZONTAL = "horizontal";

export const APP_BACKGROUND_COLOR = "rgb(45 46 49)";

export const IMAGE_TYPE = "image";

export const ENCODED_TRANSPARENT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
