export const state = {
  data: {},
  listeners: [],

  //Devuelve this.data
  getState() {
    return this.data;
  },

  //Setea longitud y latitud
  setPosition(lat, long) {
    const currentState = this.getState();
    currentState.position = { lat, long };
    this.setState(currentState);
  },

  //Busca mascotas reportadas cerca mio
  getPetsAround() {
    return [
      { name: "bobby", place: "rio cuarto", img: "unaimagen" },
      { name: "marz", place: "vm", img: "unaimagen" },
      { name: "sofa", place: "españa", img: "unaimagen" },
    ];
  },

  //Setea estado
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
  },

  //Avisa a los componentes/paginas los cambios del estado
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
