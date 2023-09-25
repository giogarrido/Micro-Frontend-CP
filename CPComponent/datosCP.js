class DatosCP extends HTMLElement {
  #urlService = 'http://localhost:3000/codigospostales/';
  #urlCodigoPostal = this.#urlService+'cp/';

  constructor() {
    super();
  }

  connectedCallback() {
    const codigoPostal = this.getAttribute("codigoPostal");
    this.attachShadow({ mode: "open" });
    this.#render();
    this.#getCodigoPostal(codigoPostal);
    //this.#agregaEstilo();
  }

  #render() {
    this.shadowRoot.innerHTML += `
    <section>
        <h2 id="codigoPostal">...</h2>
        <h2 id="estado">...</h2>
        <h2 id='municipio'>...</h2>
        <h2 id='colonia'>...</h2>

        `;
  }

  #getCodigoPostal(codigoPostal) {
    fetch(this.#urlCodigoPostal + codigoPostal)
      .then((response) => response.json())
      .then(datos => {
        let dato = this.shadowRoot.querySelector("#codigoPostal");
        dato.innerHTML = datos.info.codigo_postal.codigo_postal;
        dato = this.shadowRoot.querySelector("#estado");
        dato.innerHTML = datos.info.estado.nombre_estado;
        dato = this.shadowRoot.querySelector("#municipio");
        dato.innerHTML = datos.info.municipio.nombre_municipio;
        dato = this.shadowRoot.querySelector("#colonia");
        dato.innerHTML = datos.info.colonias[0].nombre_colonia;
   
      });
  }

  #agregaEstilo() {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./css/cp.css");
    this.shadowRoot.appendChild(link);
  }
}
window.customElements.define('cp-info', DatosCP);
