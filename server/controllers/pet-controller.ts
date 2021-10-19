import { Pet } from "../models";

type PetData = {
  name: string;
  image: string;
  lastGeo_lat: number;
  lastGeo_lon: number;
  founded: boolean;
};

export class PetController {
  model;
  constructor() {
    this.model = Pet;
  }
  //Crea una nueva mascota
  async newPet(data: PetData) {
    return this.model.create(data);
  }
  //Devuelve todas las mascotas
  async getAllPets(id: string) {
    return this.model.findAll();
  }
  //Devuelve mis mascotas publicadas
  async getMyPets(userId: string) {
    //Buscar mis mascotas por mi id
  }
  //Busca una mascota por el id
  async getPetById(petId: string) {
    return this.model.findByPk(petId);
  }
}
