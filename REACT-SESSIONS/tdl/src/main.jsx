import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TaskContextProvider } from "./TaskContext.jsx";

createRoot(document.getElementById("root")).render(
  <TaskContextProvider>
    <App />
  </TaskContextProvider>,
);
