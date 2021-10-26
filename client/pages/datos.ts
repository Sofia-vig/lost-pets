import { Router } from "@vaadin/router";
import { state } from "../state";

customElements.define(
  "datos-page",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
      const cs = state.getState();

      const form = this.querySelector(".profile-form");
      form.addEventListener("submit", async (e: any) => {
        e.preventDefault();
        const name = e.target.name.value;
        const password = e.target.password.value;
        const password_verify = e.target["password-verify"].value;
        const token = state.getToken();
        if (password) {
          if (password === password_verify) {
            if (!token) {
              await state.signUp(cs.email, password, name);
              Router.go(cs.goTo);
            } else {
              await state.update(name, password);
              Router.go("/");
            }
          } else console.log("no coinciden las password");
        } else {
          if (!token) {
            await state.signUp(cs.email, password, name);
            Router.go(cs.goTo);
          } else {
            await state.update(name, password);
            Router.go("/");
          }
        }
      });
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
        .container{
          display:flex;
          flex-direction:column;
          align-items:center;
          margin:10px 0;
          padding:10px;
      }
      .profile-form{
          margin-top:20px;
      }
      .item-input-email{
          display:flex;
          flex-direction:column;
          gap:3px;
          margin-top:15px;
          margin-bottom:20px;
      }
      .item-input-password{
        display:flex;
        flex-direction:column;
        gap:3px;
        margin:50px 0 20px 0;
    }
      .name {
          height:40px;
      }    
      .password{
          height:40px;
          margin-bottom:10px;
      }
      .password-verify{
          height:40px;
      }
    `;

      this.innerHTML = `
      <header-component></header-component>
      <div class="container">
        <title-component>Mis Datos</title-component>
        <form class="profile-form">
            <div class="item-input-email">
                <label>NOMBRE</label>
                <input type="text" name="name" class="name"/>        
            </div>
            <div class="item-input-password">
                <label>CONTRASEÑA</label>
                <input type="text" name="password" class="password"/>   

                <label>REPETIR CONTRASEÑA</label>
                <input type="text" name="password-verify" class="password-verify"/>    
            </div>
            <button-component color="#FF9DF5">Guardar</button-component>
        </form>
      </div>        
      `;

      this.appendChild(style);
    }
  }
);
