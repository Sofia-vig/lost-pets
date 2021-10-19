import { Router } from "@vaadin/router";

//Pages
import "./pages/home";
import "./pages/report";
import "./pages/auth";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/report", component: "report-page" },
  { path: "/login", component: "auth-page" },
]);
