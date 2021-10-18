import { Router } from "@vaadin/router";

//Pages
import "./pages/home";

const router = new Router(document.querySelector(".root"));
router.setRoutes([{ path: "/", component: "home-page" }]);
