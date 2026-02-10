import { forwardRef, ReactNode } from "react";

import { Box } from "@mui/material";

import styles from "./styles";

type Props = {
  children: ReactNode;
};

const ContentContainer = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children } = props;

  return (
    <Box ref={ref} sx={styles.contentContainer}>
      {children}
    </Box>
  );
});

export default ContentContainer;

