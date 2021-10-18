const icon = require("url:../img/icon.png");

customElements.define(
  "header-component",
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
        .header{
            height:60px;
            width:100%;
            background-color:#FF6868;
            display:flex;
            justify-content:space-between;
            padding:13px 20px;
        }
        .icon{
            width:40px;
            height:34px;
        }
        .nav__burger div {
            z-index: 100;
            width: 36px;
            height: 7px;
            background-color: #000000;
            margin: 5px 0;
        }

        .nav__burger .first {
            margin-top: 0;
        }
        
        `;

      this.innerHTML = `
      <header class="header">
        <img class="icon" src="${icon}"/>  
        <div class="nav__burger">
            <div class="first"></div>
            <div></div>
            <div></div>
        </div>    
      </header>
        `;

      this.appendChild(style);
    }
  }
);
