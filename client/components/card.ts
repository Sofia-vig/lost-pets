import { state } from "../state";
import { capitalize } from "lodash";
import { Router } from "@vaadin/router";

customElements.define(
  "pet-card",
  class extends HTMLElement {
    pets: any = [];
    async connectedCallback() {
      const { allPets } = await state.getPets();

      //Guardo en this.pets todas las mascotas cercanas
      this.pets = allPets;

      this.render();
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
      .card-container{
          width:320px;
          border:solid 2px black;
          margin-bottom:20px;
          border-radius:4px;
          display:flex;       
      }
      .card-image{
          width:60%;
      }
      .card-info{
          text-align:center;
          margin:0 auto;
      }
      .card-name{
          font-size:40px;
          font-weight:700;
          margin:3px;
      }
      .card-place{
          font-size:16px;
          margin:0 0 15px 0;
      }
      .card-link{
          color:#3E91DD;
      }
      `;

      this.appendChild(style);

      //Por cada mascota creo una card con la informacion
      this.pets.forEach((pet) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card-container">
            <img class="card-image" src="https://res.cloudinary.com/sofa/image/upload/v1633964076/kc2uqnwyo1ie1eyjziti.jpg"/>
            <div class="card-info">
                <h2 class="card-name">${capitalize(pet.name)}</h2>
                <h3 class="card-place">${capitalize(pet.place)}</h3>       
                <a class="card-link" href="">REPORTAR INFORMACION</a> 
            </div>    
        </div>`;

        //Si clickea en reportar informacion va a la pagina report de esa mascota
        div.querySelector(".card-link").addEventListener("click", (e) => {
          //Hay que pasar el id de la mascota
          state.setReportName(capitalize(pet.name));
          Router.go("/report");
        });

        this.appendChild(div);
      });
    }
  }
);
