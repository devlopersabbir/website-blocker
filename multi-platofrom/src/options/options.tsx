import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById("optionsPage") as HTMLBodyElement;
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ChakraProvider>
      <Toaster position="top-center" />
      <App />
    </ChakraProvider>
  </StrictMode>
);
