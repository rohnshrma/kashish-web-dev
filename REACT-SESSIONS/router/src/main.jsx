import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthContextProvider } from "./AuthContext.jsx";
import { BlogContextProvider } from "./BlogContext.jsx";

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
