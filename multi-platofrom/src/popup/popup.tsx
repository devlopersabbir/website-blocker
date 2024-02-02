import React from "react";
import ReactDOM from "react-dom/client";
import PopupModal from "./PopupModal";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <ChakraProvider>
      <Toaster position="top-center" />
      <PopupModal />
    </ChakraProvider>
  </React.StrictMode>
);
