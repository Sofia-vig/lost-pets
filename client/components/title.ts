customElements.define(
  "title-component",
  class extends HTMLElement {
    text: string;
    connectedCallback() {
      this.text = this.textContent;
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
          .title{
            font-size:40px;
            margin:0;
            font-weight:bold;
            color:#ECF0F1;
          }
        
      `;
      this.innerHTML = `
         <h1 class="title">${this.text}</h1>
        `;

      this.appendChild(style);
    }
  }
);
