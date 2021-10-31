//Router
import "./router";

//State
import { state } from "./state";

//Components
import "./components/title";
import "./components/header";
import "./components/burger-menu";
import "./components/button";
import "./components/card";
import "./components/mycard";

(async function () {
  const me = await state.getMe();
  const currentState = state.getState();
  currentState.me = me;
  state.setState(currentState);
})();

fetch("/test")
  .then((res) => res.json())
  .then((data) => console.log(data));
