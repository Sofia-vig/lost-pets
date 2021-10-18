import { state } from "../state";

customElements.define(
  "home-page",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
      const button = this.querySelector("button-component");
      button?.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          state.setPosition(latitude, longitude);
        });
      });
      state.subscribe(() => {
        this.render();
      });
    }
    render() {
      const currentState = state.getState();
      console.log(currentState);

      const style = document.createElement("style");
      style.innerHTML = `
      *{
          box-sizing:border-box;
      }
      body{
          margin:0;
      }
      .container{
          display:flex;
          flex-direction:column;
          padding:33px 32px;
          gap:50px;
      }
      .text{
          text-align:center;
          font-size:22px;
          font-weight:500;
          margin:0;
      }
      `;

      this.innerHTML = `
      <header-component></header-component>
      <div class="container">
        <title-component>Mascotas perdidas cerca tuyo</title-component>
        ${
          !currentState.position
            ? `<p class="text">Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.</p>
        <button-component color="#FF9DF5">Dar mi ubicación</button-component>`
            : `<pet-card></pet-card>`
        }
        
      </div>  
      
      `;

      this.appendChild(style);
    }
  }
);
