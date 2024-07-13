import type { Markets } from "../types.js";
import EndpointsBase from "./EndpointsBase.js";

export default class MarketsEndpoints extends EndpointsBase {
    public async getAvailableMarkets(): Promise<Markets | null> {
        return await this.getRequest<Markets>("markets");
    }
}
