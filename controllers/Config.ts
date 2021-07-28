import { IConfig } from "../interfaces/config";
import { Config as ConfigModel } from "../model/config";
import BaseController from "./BaseController";

export default class Config extends BaseController {
  async get(key: string): Promise<IConfig> {
    try {
      const model = await new ConfigModel()
        .where({ key })
        .fetch({ require: false });
      return model ? model.toJSON() : null;
    } catch (e) {
      this.logError(e, Config, this.get)
    }
  }

  async save(data: IConfig): Promise<IConfig> {
    try {
      const existingData = await new ConfigModel()
        .where({ key: data.key })
        .fetch({
          require: false,
        });

      // This part to update data
      if (!existingData) {
        const model = await ConfigModel.forge();
        return model.save(data, { method: "insert" });
      } else {
        existingData.save(data, { method: "update" });
        return null;
      }
    } catch (e) {
      this.logError(e, Config, this.save)
    }
  }
}