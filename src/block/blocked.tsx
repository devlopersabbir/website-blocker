import React from "react";
import ReactDOM from "react-dom/client";
import App from "./BlockApp.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("blocked") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Toaster position="top-center" />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
