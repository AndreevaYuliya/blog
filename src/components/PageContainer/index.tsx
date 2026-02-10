import { FC, ReactNode } from "react";

import { Box } from "@mui/material";

import styles from "./styles";

type Props = {
  children: ReactNode;
};

const PageContainer: FC<Props> = (props) => {
  const { children } = props;

  return <Box sx={styles.pageContainer}>{children}</Box>;
};

export default PageContainer;

