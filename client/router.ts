import { Router } from "@vaadin/router";

//Pages
import "./pages/home";
import "./pages/report";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/report", component: "report-page" },
]);
