import { state } from "../state";

customElements.define(
  "home-page",
  class extends HTMLElement {
    connectedCallback() {
      this.render();

      //Pido los permisos de geolocalizacion y los seteo en el state
      const button = this.querySelector("button-component");
      button?.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          state.setPosition(latitude, longitude);
        });
      });

      //Me suscribo al estado para mostrar las card si acepta geolocalizacion
      state.subscribe(() => {
        this.render();
      });
    }
    render() {
      const position = state.getPosition();

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
          align-items:center;
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

      //Pido permisos de ubicacion, si los permite muestro las mascotas cercanas
      this.innerHTML = `
      <header-component></header-component>
      <div class="container">
        <title-component>Mascotas perdidas cerca tuyo</title-component>
        ${
          !position
            ? `<p class="text">Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.</p>
               <button-component color="#debfb5">Dar mi ubicación</button-component>`
            : `<pet-card></pet-card>`
        }
        
      </div>  
      
      `;

      this.appendChild(style);
    }
  }
);
