import { state } from "../state";

customElements.define(
  "report-page",
  class extends HTMLElement {
    petName: string;
    connectedCallback() {
      this.petName = state.getState().reportName;

      this.render();

      //Data del reporte
      const form = this.querySelector(".form-report");
      form.addEventListener("submit", (e: any) => {
        e.preventDefault();
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const description = e.target.description.value;
        // state.newReport({ name, phone, description, petId: 1 });
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
