import { FC } from "react";
import { useNavigate } from "react-router";

import { Box, colors, IconButton, Typography } from "@mui/material";
import { ArrowBack, Person, Logout } from "@mui/icons-material";

import routes from "../routes/routes";
import { clearUser } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

type Props = {
  title: string;
  goBackButton?: boolean;
};

const Header: FC<Props> = (props) => {
  const { title, goBackButton } = props;

  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(clearUser());

    navigate(routes.stripe);
  };

  return (
    <Box
      sx={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        flex: 1,
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: colors.green[500],
        minHeight: 52,
        color: "#fff",
      }}
    >
      {goBackButton && (
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack htmlColor={colors.common.white} />
        </IconButton>
      )}

      <Typography variant="h5" sx={{ flex: 1, textAlign: "center" }}>
        {title}
      </Typography>

      {!user ? (
        <IconButton
          onClick={() => navigate(routes.login)}
          sx={{ cursor: "pointer" }}
        >
          <Person htmlColor={colors.common.white} />
        </IconButton>
      ) : (
        <IconButton onClick={handleLogOut}>
          <Logout htmlColor={colors.common.white} />
        </IconButton>
      )}
    </Box>
  );
};

export default Header;

