import { state } from "../state";
import { capitalize } from "lodash";
import { Router } from "@vaadin/router";

customElements.define(
  "pet-card",
  class extends HTMLElement {
    pets: any = [];
    async connectedCallback() {
      if (this.hasAttribute("type")) {
        const { myPets } = await state.getMyPets();
        this.pets = myPets;
      } else {
        //Guardo en this.pets todas las mascotas cercanas
        const { allPets } = await state.getPets();
        this.pets = allPets;
      }

      this.render();
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
      .card-container{
          display:flex;  
          flex-direction:column;     
          justify-content:center;
          align-items:center;
          width:320px;
          border:solid 4px #ECF0F1 ;
          margin-bottom:20px;
          border-radius:15px;
          padding:13px 0;
      }
      .card-image{
          width:60%;
      }
      .card-info{
        text-align:center;
        padding:10px;
        
      }
      .card-name{
          font-size:40px;
          font-weight:700;
          color:#ECF0F1;
          margin:3px;
      }
      .card-place{
          font-size:16px;
          margin:0 0 15px 0;
      }
      .card-link{
          color:#ECF0F1;
          text-align:center;
          font-weight:700;
      }
      `;

      this.appendChild(style);

      //Por cada mascota creo una card con la informacion
      this.pets.forEach((pet) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card-container">
            <img class="card-image" src="${pet.image}"/>
            <div class="card-info">
                <h2 class="card-name">${capitalize(pet.name)}</h2>
                <h3 class="card-place">${capitalize(pet.place)}</h3>       
                ${
                  this.hasAttribute("type")
                    ? `<a class="card-link" href="">Editar</a>`
                    : `<a class="card-link" href="">REPORTAR INFORMACION</a> `
                }
            </div>    
        </div>`;

        //Si clickea en reportar informacion va a la pagina report de esa mascota
        div.querySelector(".card-link")?.addEventListener("click", (e) => {
          //Hay que pasar el id de la mascota
          state.setReportName(capitalize(pet.name));
          Router.go("/report");
        });

        this.appendChild(div);
      });
    }
  }
);
