import { Router } from "@vaadin/router";
import { state } from "../state";

customElements.define(
  "menu-component",
  class extends HTMLElement {
    email: string;
    connectedCallback() {
      const cs = state.getState();

      state.subscribe(() => {
        this.email = cs?.me?.email;
      });

      this.email = cs?.me?.email;

      this.render();

      const token = state.getToken();

      const close = this.querySelector(".close");
      close.addEventListener("click", () => {
        this.innerHTML = `<header-component></header-component>`;
      });

      const myData = this.querySelector(".datos");
      myData.addEventListener("click", () => {
        state.setRouter("/profile/edit");
        !token && Router.go("/login");
        token && Router.go("/profile/edit");
      });

      const report = this.querySelector(".report");
      report.addEventListener("click", () => {
        state.setRouter("/pets/new");
        token && Router.go("/pets/new");
        !token && Router.go("/login");
      });

      const mascotas = this.querySelector(".mascotas");
      mascotas.addEventListener("click", () => {
        state.setRouter("/me/pets");
        token && Router.go("/me/pets");
        !token && Router.go("/login");
      });

      const footer = this.querySelector(".footer-menu");
      const logout = this.querySelector(".logout");
      logout?.addEventListener("click", () => {
        footer.textContent = "";
        const cs = state.getState();
        cs.me = {};
        state.setState(cs);
        state.logOut();
      });
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
          *{
              box-sizing:border-box;
          }
          body{
              margin:0;
              padding:0;
          }
          h4,p {
              margin:0;
          }
          .container-menu{
            width:100%;
            height:100vh;
            background: #2e2e2e;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
          }
          .text-menu{
            font-size:24px;
            font-weight:700;
            padding: 0 104px;
            text-align:center;
            display:flex;
            flex-direction:column;
            gap:45px;
            margin-bottom:200px;
            color:#ECF0F1;
          }
          .footer-menu{
              text-align:center;
          }
          .footer-menu p {
              font-size:24px;
              color:#ECF0F1;
          }
          .footer-menu a {
              font-size:16px;
              color:#ECF0F1;
          }
          .close{
            font-size:24px;
            font-weight:700;
            position:fixed;
            top:10px;
            left:10px;
            color:#ECF0F1;
          }
          .hide{
            display:none;
          }
          
          `;

      this.innerHTML = `
        <div class="container-menu">
        <div class="close">X</div>
          <div class="text-menu">
            <h4 class="datos">Mis Datos</h4>
            <h4 class="mascotas">Mis mascotas reportadas</h4>
            <h4 class="report">Reportar mascota</h4>
          </div>
          <div class="footer-menu">
            ${
              this.email
                ? ` 
                <p>${this.email}</p>
                <a href="" class="logout">CERRAR SESIÓN</a>`
                : ""
            }
          </div>
        </div>
          `;

      this.appendChild(style);
    }
  }
);
