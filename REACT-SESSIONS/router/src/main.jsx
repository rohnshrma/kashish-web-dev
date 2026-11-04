import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BlogContextProvider } from "./context/BlogContext.jsx";

// BrowserRouter turns on routing for everything inside it.
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <BlogContextProvider>
        <App />
      </BlogContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
);
