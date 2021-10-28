import { state } from "../state";
import { Dropzone } from "dropzone";

customElements.define(
  "newpet-page",
  class extends HTMLElement {
    petName: string;
    connectedCallback() {
      this.petName = state.getState().reportName;

      this.render();

      const form = document.querySelector(".form-pet");

      let filePic;
      const myDropzone = new Dropzone(".container-pic", {
        url: "/falsa",
        autoProcessQueue: false,
      });

      myDropzone.on("addedfile", function (file) {
        filePic = file;
      });

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const targets = event.target as any;
        const pictureDataURL = filePic.dataURL;
        const name = targets.name.value;
        // const lastGeo = targets.location.value;
        state.createPet({
          image: pictureDataURL,
          name,
          lastGeo_lat: 1,
          lastGeo_lon: 2,
        });
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
      }
      .container{
          display:flex;
          flex-direction:column;
          align-items:center;
          padding:33px 32px;
      }
      .form-pet{
          display:flex;
          flex-direction:column;
          margin:15px 0;
      }
      .input-item{
          display:flex;
          flex-direction:column;
          margin:15px 0;
      }
      .input-text{
          height:50px;
          font-size:24px;
      }
      .container-pic{
        margin-bottom:10px;
        height:140px;
        border: 3px solid #5297ac;
        border-radius:4px;
      }
      .pic{
       background:grey;
       display:flex;
       justify-content:center;
       align-items:center;
      }
      .map{
        width:100%;
        height:200px;
        background-color:black;
        border-radius:2px;
        margin:20px 0;
      }
      .text{
        font-size:16px;
        font-weight:500;
      }
      .cancelar{
        margin-top:20px;
      }
   `;

      this.innerHTML = `
        <header-component></header-component>
        <div class="container">
             <title-component>Reportar mascota perdida</title-component>
             <form class="form-pet">
                <div class="input-item">
                    <label>NOMBRE</label>
                    <input type="text" name="name" class="input-text"/>
                </div>
                <div class="container-pic">
                    <img class="pic"/>
                </div>
                <button-component type="button" color="#debfb5">agregar/modificar foto</button-component>
                <div class="map"></div>
                <div class="input-item">
                    <label>UBICACIÓN</label>
                    <input type="text" name="location" class="input-text"/>
                </div>
                <p class="text">Buscá un punto de referencia para reportar a tu mascota. Puede ser una dirección, un barrio o una ciudad.</p>
                <button-component type="submit">Reportar como perdido</button-component>
                <button-component type="button" class="cancelar">Cancelar</button-component>

             </form>
        </div>  
      `;

      this.appendChild(style);
    }
  }
);
