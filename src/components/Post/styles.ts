import { colors, CSSProperties } from "@mui/material";

const styles = {
  container: (isFirstPost: boolean, isLastPost: boolean) => ({
    display: "flex",
    flexDirection: "column",
    p: 2,
    borderRadius: "8px",
    boxShadow: `0 2px 5px ${colors.green[700]}`,
    width: "70%",
    minHeight: "fit-content",
    backgroundColor: colors.green[100],
    marginTop: isFirstPost ? 2 : 0,
    marginBottom: isLastPost ? 2 : 0,
  }),

  userContainer: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 2,
  },

  username: {
    fontWeight: "bold",
    color: colors.green[900],
  },

  image: {
    float: "left",
    width: 300,
    height: 200,
    objectFit: "cover",
    marginRight: 12,
    marginBottom: 8,
  } as CSSProperties,

  description: {
    textWrap: "pretty",
    wordBreak: "break-word",
  },
};

export default styles;

