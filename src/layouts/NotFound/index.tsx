import { FC } from "react";

import { Typography } from "@mui/material";

import PageContainer from "../../components/PageContainer";

const NotFound: FC = () => {
  return (
    <PageContainer>
      <Typography variant="h5" textAlign="center" marginTop="20px">
        404 - Page Not Found
      </Typography>
    </PageContainer>
  );
};

export default NotFound;
