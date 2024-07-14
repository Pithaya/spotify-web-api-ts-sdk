import type { Market, Episode, Episodes } from "../types.js";
import { validateLength } from "../validation/validators.js";
import EndpointsBase from "./EndpointsBase.js";

export const MAX_GET_MULTIPLE_EPISODES_IDS = 50;

export default class EpisodesEndpoints extends EndpointsBase {
    public get(id: string, market?: Market): Promise<Episode | null>;
    public get(ids: string[], market?: Market): Promise<Episode[]>;
    public async get(idOrIds: string | string[], market?: Market) {
        if (typeof idOrIds === "string") {
            const params = this.paramsFor({ market });
            return await this.getRequest<Episode>(`episodes/${idOrIds}${params}`);
        }

        validateLength("ids", idOrIds, 1, MAX_GET_MULTIPLE_EPISODES_IDS);
        const params = this.paramsFor({ ids: idOrIds, market });
        const response = await this.getRequest<Episodes>(`episodes${params}`);
        return response?.episodes ?? [];
    }
}
