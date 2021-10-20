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
    localStorage.setItem("position", JSON.stringify({ lat, long }));
    this.setState(currentState);
  },

  //Setea nombre de la mascota a la cual das informacion (y tmb ID)
  setReportName(petName: string) {
    const cs = this.getState();
    cs.reportName = petName;
    this.setState(cs);
  },

  //Devuelve posicion guardada en el localStorage
  getPosition() {
    const positionLocalStorage = localStorage.getItem("position");
    return JSON.parse(positionLocalStorage);
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
