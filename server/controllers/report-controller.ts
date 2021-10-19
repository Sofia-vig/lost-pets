import { Report } from "../models";

type ReportData = {
  reporter_name: string;
  phone_number: string;
  message: string;
  petId: string;
};

export class ReportController {
  model;
  constructor() {
    this.model = Report;
  }
  //Crea un reporte
  async createReport(data: ReportData) {
    return this.model.create(data);
  }
  //Devuelve un reporte por el id
  async getReport(id: number) {
    return this.model.findOne({ where: { id } });
  }
  //Devuelve todos los reportes
  async getAllReport() {
    return this.model.findAll();
  }
}
