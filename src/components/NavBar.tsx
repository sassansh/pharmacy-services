import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

/** list your pages in one place */
const links = [
  { label: "Home", to: "/" },
  { label: "Prescribing", to: "/prescribing" },
  { label: "Immunizations", to: "/immunizations" },
];

export default function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { pathname } = useLocation();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const drawer = (
    <Box sx={{ width: 240 }} role="presentation" onClick={toggleDrawer}>
      <Toolbar />
      <Divider />
      <List>
        {links.map(({ label, to }) => (
          <ListItemButton
            key={to}
            component={RouterLink}
            to={to}
            selected={pathname === to}
          >
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {/* burger icon on mobile */}
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open navigation"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              fontWeight: 600,
            }}
          >
            Pharmacy Services
          </Typography>

          {/* inline buttons on desktop */}
          {!isMobile &&
            links.map(({ label, to }) => (
              <Button
                key={to}
                component={RouterLink}
                to={to}
                color="inherit"
                sx={{
                  ml: 1,
                  borderBottom:
                    pathname === to ? "2px solid rgba(255,255,255,0.9)" : 0,
                }}
              >
                {label}
              </Button>
            ))}
        </Toolbar>
      </AppBar>

      {/* slide‑in drawer for mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </>
  );
}
