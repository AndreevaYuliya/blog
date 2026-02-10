import { colors } from "@mui/material";

const styles = {
  paginationContainer: {
    position: "fixed",
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: 56,
    backgroundColor: colors.green[500],
    boxShadow: `0 2px 5px ${colors.green[300]}`,
    "& li > button:hover": {
      backgroundColor: colors.green[700],
    },
    "& button": {
      color: colors.common.white,
      fontWeight: 500,

      "&.Mui-selected": {
        backgroundColor: colors.green[300],
      },
    },
    "& div": {
      color: colors.common.white,
      fontWeight: 500,
    },
  },
};

export default styles;

