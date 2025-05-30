import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./contexts/userContext.jsx";
import { GroupProvider } from "./contexts/GroupContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GroupProvider>
      <UserContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
    </GroupProvider>
  </StrictMode>
);
