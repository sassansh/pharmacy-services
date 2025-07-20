import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import App from "./App";
// src/main.tsx or src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3A7DA8", // muted blue
      contrastText: "#ffffff",
    },
    background: {
      default: "#eef4f7", // your existing page bg
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
