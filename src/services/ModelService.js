import { BaseService } from "./BaseService";

export class ModelService extends BaseService {
  constructor() {
    super("/model");
  }

  async get(urlParams) {
    return this.get(urlParams);
  }
}