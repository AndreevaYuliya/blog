import { FC } from "react";

import { Backdrop as MuiBackdrop, CircularProgress } from "@mui/material";

const Backdrop: FC = () => {
  return (
    <MuiBackdrop
      open
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress color="success" />
    </MuiBackdrop>
  );
};

export default Backdrop;

