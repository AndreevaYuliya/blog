import { FC, ReactNode } from "react";

import { Box } from "@mui/material";

type Props = {
  children: ReactNode;
};

const Container: FC<Props> = (props) => {
  const { children } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default Container;

