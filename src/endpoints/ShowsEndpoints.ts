import type { Market, Show, Shows, MaxInt, Page, SimplifiedEpisode } from "../types.js";
import { validateLength } from "../validation/validators.js";
import EndpointsBase from "./EndpointsBase.js";

export const MAX_GET_MULTIPLE_SHOWS_IDS = 50;

export default class ShowsEndpoints extends EndpointsBase {
    public get(id: string, market?: Market): Promise<Show | null>;
    public get(ids: string[], market?: Market): Promise<Show[]>;
    public async get(idOrIds: string | string[], market?: Market) {
        if (typeof idOrIds === "string") {
            const params = this.paramsFor({ market });
            return await this.getRequest<Show>(`shows/${idOrIds}${params}`);
        }

        validateLength("ids", idOrIds, 1, MAX_GET_MULTIPLE_SHOWS_IDS);
        const params = this.paramsFor({ ids: idOrIds, market });
        const response = await this.getRequest<Shows>(`shows${params}`);
        return response?.shows ?? [];
    }

    public async episodes(id: string, market?: Market, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ market, limit, offset });
        return await this.getRequest<Page<SimplifiedEpisode>>(`shows/${id}/episodes${params}`);
    }
}
