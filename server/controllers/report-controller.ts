import { Report } from "../models";

export class ReportController {
  async reportPet(data) {
    const newReport = await Report.create(data);
    return newReport;
  }
}
