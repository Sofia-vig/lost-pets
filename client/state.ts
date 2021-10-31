import { Router } from "@vaadin/router";
import { getAutomaticTypeDirectiveNames, updateParameter } from "typescript";

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

  //get token de localStorage
  getToken() {
    const token = localStorage.getItem("token");
    return token;
  },

  //si existe un user con ese email
  async userExist(email: string) {
    const res = await fetch("/exist" + "?email=" + email);
    const { find } = await res.json();

    const cs = this.getState();
    cs.email = email;
    this.setState(cs);

    return find;
  },

  //get my info
  async getMe() {
    const token = await this.getToken();
    const res = await fetch("/me", {
      method: "get",
      headers: {
        Authorization: token ? "bearer " + token : null,
      },
    });
    return await res.json();
  },

  //signIn
  async signIn(email: string, password: string) {
    const request = await fetch("/auth/token", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await request.json();
    if (response.token) {
      localStorage.setItem("token", response.token);
      const cs = this.getState();
      cs.me = { email };
      this.setState(cs);
      return true;
    } else {
      return false;
    }
  },

  //signup
  async signUp(email: string, password: string, fullname: string) {
    const request = await fetch("/auth", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        fullname,
      }),
    });
    const response = await request.json();
    return response;
  },

  //Setea nombre de la mascota a la cual das informacion (y tmb deberia ID)
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

  //Setea ruta para ir dsp de login o signup
  setRouter(goTo: string) {
    const cs = this.getState();
    cs.goTo = goTo;
    this.setState(cs);
  },

  //actualiza mis datos
  async update(fullname?: string, password?: string) {
    const token = await this.getToken();
    await fetch("/me", {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: token ? "bearer " + token : null,
      },
      body: JSON.stringify({
        password,
        fullname,
      }),
    });
    return { ok: true };
  },

  //crear una mascota
  async createPet(petData) {
    const token = await this.getToken();
    const newPet = await fetch("/pets", {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: token ? "bearer " + token : null,
      },
      body: JSON.stringify(petData),
    });
    return await newPet.json();
  },

  async updatePet(petData) {
    const token = await this.getToken();
    const petUpdate = await fetch("/pets/" + petData.id, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: token ? "bearer " + token : null,
      },
      body: JSON.stringify(petData),
    });
    const response = await petUpdate.json();
    console.log(response);
  },

  //devuelve las mascotas no encontradas
  async getPets() {
    const allPets = await fetch("/pets");
    return await allPets.json();
  },

  //devuelve mis mascotas reportadas
  async getMyPets() {
    const token = await this.getToken();
    const myPets = await fetch("/me/pets", {
      method: "get",
      headers: {
        Authorization: token ? "bearer " + token : null,
      },
    });

    return await myPets.json();
  },

  //reportar mascota
  async newReport(data) {
    const newReport = await fetch("/pets/report", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await newReport.json();
  },

  async setPetById(petId) {
    const token = await this.getToken();
    const pet = await fetch("/pets/" + petId, {
      method: "get",
      headers: {
        Authorization: token ? "bearer " + token : null,
      },
    });
    const response = await pet.json();
    const { name, image, lastGeo_lat, lastGeo_lon, founded } = response;
    const data = {
      name,
      image,
      lastGeo_lat,
      lastGeo_lon,
      id: petId,
    };
    const cs = this.getState();
    cs.petData = data;
    this.setState(cs);
  },

  //cerrar sesión
  logOut() {
    localStorage.removeItem("token");
    Router.go("/");
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
