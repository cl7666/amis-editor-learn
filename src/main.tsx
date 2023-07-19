import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";

//渲染App到页面
const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
// createRoot(document.getElementById("root") as HTMLElement).render(
//   <HashRouter>
//     <App />
//   </HashRouter>
// );
