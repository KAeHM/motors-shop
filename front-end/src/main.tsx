import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { theme } from "./styles/globalStyle";
import AppRoutes from "./routes/AppRoutes";
import { UserContextProvider } from "./contexts/userContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <Toaster />
    <BrowserRouter>
      <UserContextProvider>
        <AppRoutes></AppRoutes>
      </UserContextProvider>
    </BrowserRouter>
  </ChakraProvider>
);
