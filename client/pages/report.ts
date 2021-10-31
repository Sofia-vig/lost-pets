import { Router } from "@vaadin/router";
import { state } from "../state";

customElements.define(
  "report-page",
  class extends HTMLElement {
    petName: string;
    petId;
    connectedCallback() {
      const cs = state.getState();
      this.petName = cs.reportName;
      this.petId = cs.petId;

      this.render();

      //Data del reporte
      const form = this.querySelector(".form-report");
      form.addEventListener("submit", async (e: any) => {
        e.preventDefault();
        const reporter_name = e.target.name.value;
        const phone_number = e.target.phone.value;
        const message = e.target.description.value;
        await state.newReport({
          reporter_name,
          phone_number,
          message,
          petId: this.petId,
        });

        const container = this.querySelector(".container");

        const style = document.createElement("style");
        style.innerHTML = `
        .response-container{
          display:flex;
          flex-direction:column;
          align-items:center;
          margin-top:20px;
          justify-content:center;
          gap:4px;
          text-align:center;
        }
        .reponse{
          font-size:30px;
          font-family:"Dosis";
          font-weight:bold;
          color:#ECF0F1;
        }
        h5{
          font-size:24px;
          font-family:"Dosis";
          color:#ECF0F1;
        }
        `;

        this.appendChild(style);

        container.innerHTML = `
        <div class="response-container">
          <h2 class="reponse">Gracias por reportar, la mascotita te lo agradece ♥</h2>
          <h5>Redirigiendo...</h5>
        </div>  
        `;

        setTimeout(() => {
          Router.go("/");
        }, 3000);
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
          padding:33px 32px;
          color:#EDEDED;
      }
      .form-report{
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
          background-color:#ECF0F1;
          border:0;    
          font-family:"Dosis";      
      }
      .input-textarea{
          height:120px;
          font-size:24px;
          background-color:#ECF0F1;
          border:0;
          font-family:"Dosis";
      } 
      input[type=text]:focus {
        outline:none;
       }
       textarea:focus{
         outline:none;
       }
      `;

      this.innerHTML = `
        <header-component></header-component>
        <div class="container">
             <title-component>Reportar info de ${this.petName}</title-component>
             <form class="form-report">
                <div class="input-item">
                    <label>TU NOMBRE</label>
                    <input type="text" name="name" class="input-text"/>
                </div>
                <div class="input-item">
                    <label>TU TELEFONO</label>
                    <input type="text" name="phone" class="input-text"/>
                </div>
                <div class="input-item">
                    <label>DONDE LO VISTE?</label>
                    <textarea name="description" class="input-textarea"></textarea>
                </div>
                <button-component color="#FF9DF5">Enviar</button-component>
             </form>
        </div>     
        `;

      this.appendChild(style);
    }
  }
);
