customElements.define(
  "button-component",
  class extends HTMLElement {
    text: string;
    color: string;
    type: string = "submit";
    connectedCallback() {
      this.text = this.textContent;
      this.color = this.getAttribute("color");
      this.type = this.getAttribute("type");
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
        .container-button{
            display:flex;
            justify-content:center;
            align-items:center;
        }
        .button{
            background-color:${this.color};
            width:335px;
            height:50px;
            border:none;
            border-radius:4px;
            font-size:16px;
            font-weight:700;
        }
    `;
      this.innerHTML = `
      <div class="container-button">
        <button type="${this.type}" class="button">${this.text}</button>
      </div>  
        `;

      this.appendChild(style);
    }
  }
);