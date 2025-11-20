import React from "react";
import ReactDOM from "react-dom/client";
import PetHealthApp from "./components/PetHealthApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PetHealthApp />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/PetHealthApp/sw.js");
  });
}
