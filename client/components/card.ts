import { state } from "../state";
import { capitalize } from "lodash";

customElements.define(
  "pet-card",
  class extends HTMLElement {
    pets: any[];
    connectedCallback() {
      this.pets = state.getPetsAround();
      this.render();
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
      .card-container{
          width:320px;
          border:solid 2px black;
          margin: 0 auto 20px 0;
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
      this.pets.forEach((pet) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card-container">
            <img class="card-image" src="https://res.cloudinary.com/sofa/image/upload/v1633964076/kc2uqnwyo1ie1eyjziti.jpg"/>
            <div class="card-info">
                <h2 class="card-name">${capitalize(pet.name)}</h2>
                <h3 class="card-place">${capitalize(pet.place)}</h3>       
                <a class="card-link"href="">REPORTAR INFORMACION</a> 
            </div>    
        </div>`;
        this.appendChild(div);
      });
    }
  }
);
