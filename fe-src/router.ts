import { Router } from "@vaadin/router";

//Pages
import "./pages/home";
import "./pages/report";
import "./pages/auth";
import "./pages/datos";
import "./pages/new-pet";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/report", component: "report-page" },
  { path: "/login", component: "auth-page" },
  { path: "/profile/edit", component: "datos-page" },
  { path: "/pets/new", component: "newpet-page" },
]);
