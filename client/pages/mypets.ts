import { state } from "../state";

customElements.define(
  "mypets-page",
  class extends HTMLElement {
    pets: any;
    async connectedCallback() {
      const { myPets } = await state.getMyPets();
      this.pets = myPets;
      this.render();
    }
    render() {
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
          color:#ECF0F1;
      }
      .empty{
        font-size:24px;
        color:#ECF0F1;
        font-weight:bold;
        text-align:center;
        padding:20px;
        border:solid;
      }
      `;

      //Pido permisos de ubicacion, si los permite muestro las mascotas cercanas
      this.innerHTML = `
      <header-component></header-component>
      <div class="container">
        <title-component>Mis mascotas  reportadas</title-component>
        ${
          this.pets.length > 0
            ? `<my-card></my-card>`
            : `<h3 class="empty">Aun no reportaste mascotas perdidas</h3>`
        }              
      </div>  
      
      `;

      this.appendChild(style);
    }
  }
);
