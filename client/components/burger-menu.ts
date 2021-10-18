customElements.define(
  "menu-component",
  class extends HTMLElement {
    connectedCallback() {
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
              padding:0;
          }
          h4,p {
              margin:0;
          }
          .container-menu{
            width:100%;
            height:100vh;
            background: #8AF1FF;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
          }
          .text-menu{
              font-size:24px;
              font-weight:700;
              padding: 0 104px;
              text-align:center;
              display:flex;
              flex-direction:column;
              gap:45px;
              margin-bottom:200px;
          }
          .footer-menu{
              text-align:center;
          }
          .footer-menu p {
              font-size:24px;
          }
          .footer-menu a {
              font-size:16px;
              color: #C6558B;
          }
          
          `;

      this.innerHTML = `
        <div class="container-menu">
          <div class="text-menu">
            <h4>Mis Datos</h4>
            <h4>Mis mascotas reportadas</h4>
            <h4>Reportar mascota</h4>
          </div>
          <div class="footer-menu">
            <p>sofa@sofa.com</p>
            <a href="">CERRAR SESIÓN</a>
          </div>
        </div>
          `;

      this.appendChild(style);
    }
  }
);
