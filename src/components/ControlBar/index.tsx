import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import {
  AppBar,
  Box,
  Button,
  colors,
  Divider,
  IconButton,
  Menu,
  Typography,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

import routes from "../../routes/routes";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearUser } from "../../store/slices/userSlice";
import { StyledMenuItem } from "../../styles/muiStyles";

import styles from "./styles";

type Props = {
  title: string;
  handleScrollTop?: () => void;
};

const ControlBar: FC<Props> = (props) => {
  const { title, handleScrollTop } = props;

  const navigate = useNavigate();

  const isAuthenticated = useAppSelector((state) => state.user.user);
  const user = useAppSelector((state) => state.user.user?.username);

  const location = useLocation();

  const dispatch = useAppDispatch();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const pages = isAuthenticated
    ? ["Home", "My Posts", "Create New Post"]
    : ["Home"];

  const pageRoutes: Record<string, string> = {
    Home: routes.stripe,
    "My Posts": routes.home,
    "Create New Post": routes.newPost,
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageChange = (page: string) => {
    const route = pageRoutes[page];

    if (route) {
      navigate(route);
    }

    handleCloseNavMenu();
  };

  const handleLogIn = () => {
    navigate(routes.login);
  };

  const handleLogOut = () => {
    dispatch(clearUser());

    navigate(routes.stripe);
  };

  return (
    <AppBar sx={styles.headerContainer}>
      <Box sx={styles.titleContainer}>
        <Typography variant="h5" sx={styles.title} onClick={handleScrollTop}>
          {title}
        </Typography>

        <Box sx={styles.menuButtonContainer}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={styles.menuContainer}
          >
            {pages.map((page) => {
              const route = pageRoutes[page];
              const isActive = route ? location.pathname === route : false;

              return (
                <StyledMenuItem
                  key={page}
                  onClick={handlePageChange.bind(null, page)}
                  selected={isActive}
                >
                  <Typography textAlign="center">{page}</Typography>
                </StyledMenuItem>
              );
            })}
          </Menu>
        </Box>

        <Box sx={styles.buttonsContainer}>
          {pages.map((page) => {
            const route = pageRoutes[page];
            const isActive = route ? location.pathname === route : false;

            return (
              <Button
                key={page}
                onClick={handlePageChange.bind(null, page)}
                sx={styles.navButton(isActive)}
              >
                {page}
              </Button>
            );
          })}
        </Box>

        <Box sx={styles.userContainer}>
          {user && (
            <>
              <Typography
                component="span"
                color={colors.common.white}
                fontWeight="bold"
              >
                {user}
              </Typography>

              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={styles.divider}
              />
            </>
          )}

          {!isAuthenticated ? (
            <IconButton onClick={handleLogIn} sx={styles.icon}>
              <PersonIcon htmlColor={colors.common.white} />
            </IconButton>
          ) : (
            <IconButton onClick={handleLogOut} sx={styles.icon}>
              <LogoutIcon htmlColor={colors.common.white} />
            </IconButton>
          )}
        </Box>
      </Box>
    </AppBar>
  );
};

export default ControlBar;

