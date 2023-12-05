import { makeObservable, runInAction } from "mobx";
import { ModelService } from "../services/ModelService";

class ModelStore {
  modelService = new ModelService();
  modelData = [];
  status = "initial";
  error = undefined;

  constructor() {
    makeObservable(this);
  }

  fetchModels = async (paramsData) => {
    try {
      var params = {
        sortBy: paramsData.sortBy,
        orderBy: paramsData.orderBy,
        limit: paramsData.limit,
        skip: paramsData.skip,
        Id: paramsData.Id,
        Name: paramsData.Name,
        Abrv: paramsData.Abrv,
        MakeId: paramsData.MakeId,
      };
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(
          ([key, value]) => value !== undefined && value !== ""
        )
      );
      const urlParams = new URLSearchParams(Object.entries(filteredParams));
      const data = await this.modelService.get(urlParams);
      runInAction(() => {
        this.modelData = data;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
}

const modelStore = new ModelStore();
export default modelStore;