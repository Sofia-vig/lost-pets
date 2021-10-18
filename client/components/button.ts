customElements.define(
  "button-component",
  class extends HTMLElement {
    text: string;
    color: string;
    connectedCallback() {
      this.text = this.textContent;
      this.color = this.getAttribute("color");
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
        }
    `;
      this.innerHTML = `
      <div class="container-button">
        <button class="button">${this.text}</button>
      </div>  
        `;

      this.appendChild(style);
    }
  }
);
