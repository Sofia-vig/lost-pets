import { state } from "../state";
import { Dropzone } from "dropzone";

customElements.define(
  "newpet-page",
  class extends HTMLElement {
    petName: string;
    connectedCallback() {
      this.petName = state.getState().reportName;

      this.render();

      const form: any = document.querySelector(".form-pet");
      let filePic;
      // la url la exige la librería
      const myDropzone = new Dropzone(".pic", {
        url: "/falsa",
        autoProcessQueue: false,
      });

      console.log(myDropzone);

      myDropzone.on("addedfile", function (file) {
        // usando este evento pueden acceder al dataURL directamente
        filePic = file;
      });

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const targets = event.target as any;
        const dataURL = filePic.dataURL;
        const name = targets.name.value;
        console.log({ name, dataURL });

        // const req = await fetch("http://localhost:8080/profile", {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   method: "POST",
        //   body: JSON.stringify({ fullName, bio, dataURL }),
        // });
        // console.log(req);
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
      }
      .pic{
       width:333px;
       height:100px;
       background:grey;
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
                      <div class="pic"></div>
                  </div>
                  <button-component color="#97EA9F">agregar/modificar foto</button-component>
             </form>
        </div>  
      `;

      this.appendChild(style);
    }
  }
);
